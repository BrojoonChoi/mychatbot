import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    'OpenAI-Beta': 'assistants=v2'
  }
});

// ✅ 스레드 ID를 저장할 변수 (최초 생성 후 유지)
let threadId:string|undefined = undefined;

export const askChatBot = async (question:string) => {
  try {
    // 1. 스레드가 없으면 생성
    if (!threadId) {
      const threadRes = await apiClient.post('/threads');
      threadId = threadRes.data.id;
    }

    // 2. 메시지 추가
    await apiClient.post(`/threads/${threadId}/messages`, {
      role: 'user',
      content: question,
    });

    // 3. 실행 요청
    const runRes = await apiClient.post(`/threads/${threadId}/runs`, {
      assistant_id: process.env.NEXT_PUBLIC_ASSISTANT_CODE
    });

    const runId = runRes.data.id;

    // 4. 실행 완료 여부 확인
    while (true) {
      const statusRes = await apiClient.get(`/threads/${threadId}/runs/${runId}`);
      if (statusRes.data.status === 'completed') break;
      if (['failed', 'cancelled'].includes(statusRes.data.status)) {
        throw new Error('챗봇 실행 실패');
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
    }

    // 5. 응답 가져오기
    const messagesRes = await apiClient.get(`/threads/${threadId}/messages`);
    const assistantMessage = messagesRes.data.data.find(msg => msg.role === 'assistant');

    return {
      response: assistantMessage?.content[0]?.text?.value || '답변을 가져오지 못했습니다.',
      threadId: threadId, // ✅ threadId를 반환하여 유지할 수 있도록 변경
    };
  } catch (error) {
    console.error('챗봇 API 에러:', error);
    return { response: '오류가 발생했습니다. 다시 시도해주세요.', threadId };
  }
};
