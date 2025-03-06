import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // OpenAI API 키
const MODEL_ID = process.env.NEXT_PUBLIC_MODEL_ID; // Fine-tuned 모델 ID
const API_URL = "https://api.openai.com/v1/chat/completions";

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  }
});

// ✅ 대화 히스토리 관리
let messagesHistory: any[] = [
  { role: "system", content: "당신은 팀 프로젝트 정보를 제공하는 AI입니다." }
];

// ✅ 챗봇 API 호출 함수
export const askChatBot = async (question: string) => {
  try {
    // 사용자 메시지 추가
    messagesHistory.push({ role: "user", content: question });

    // API 요청
    const response = await apiClient.post(API_URL, {
      model: MODEL_ID,
      store:true,
      messages: messagesHistory,
    });

    const assistantMessage = response.data.choices[0].message.content;

    // AI 응답 저장
    messagesHistory.push({ role: "assistant", content: assistantMessage });

    return {
      response: assistantMessage,
    };
  } catch (error) {
    console.error('챗봇 API 에러:', error);
    return { response: '오류가 발생했습니다. 다시 시도해주세요.' };
  }
};
