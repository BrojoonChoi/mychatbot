"use client";

import { useState, useEffect, useRef } from "react";
import Drawer from "./common/drawer";
import styles from "@/components/home.module.css";
import Image from "next/image";
import InputBox from "./common/inputbox";
import { askChatBot } from "@/system/api";

type MessageType = {
  role: string;
  content: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [hasChatted, setHasChatted] = useState<boolean>(false);

  // ✅ 채팅 리스트의 가장 아래로 스크롤 이동
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setHasChatted(true);

    // 사용자의 메시지를 추가
    const newUserMessage: MessageType = { role: "user", content: question };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setQuestion("");

    try {
      // OpenAI API 호출
      const { response } = await askChatBot(question);

      // 챗봇 응답 추가
      const newAssistantMessage: MessageType = {
        role: "assistant",
        content: response,
      };

      setMessages([...newMessages, newAssistantMessage]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {!hasChatted && <div style={{ flex: 1 }}></div>}

        {hasChatted && (
          <div className={`${styles.chatHistory} hidden-scrollbar`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.chatMessage} ${msg.role === "user" ? styles.userMessage : styles.botMessage}`}
              >
                <p>{msg.content}</p>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.chatMessage} ${styles.botMessage}`}>
                <Image src="/assets/home/anim.gif" alt="loading" width={40} height={40} />
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>
        )}

        {!hasChatted && (
          <header className={styles.header}>
            <h1 className={styles.rainbowText}>My Chat Bot</h1>
            <span>무엇이든 물어보세요.</span>
          </header>
        )}

        <div className={styles.inputContainer}>
          <InputBox
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onSend={handleAsk}
            disabled={isLoading} 
            placeholder={!hasChatted ? "MES 수율 보는 화면이 어디에 있지?" : ""}
          />
        </div>

        {!hasChatted && (
          <footer className={styles.footer}>
            <strong>개발자</strong> <Image src={"/assets/home/info-circle.webp"} alt="info" width={15} height={15} /> 최완준이 만듬
            <Image
              src={"/assets/home/copyright-circle.webp"}
              alt="info"
              width={13.4}
              height={13.4}
              style={{ marginLeft: "25px" }}
            />
          </footer>
        )}
      </div>

      {isOpen ? (
        <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      ) : (
        <div className={styles.floatingButtonContainer}>
          <Image alt="img_logo" src="/assets/home/logo_lg.webp" width={91} height={26} />
          <Image
            alt="img_logo"
            src="/assets/home/btn_open.webp"
            width={29}
            height={29}
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer}
          />
        </div>
      )}
    </div>
  );
}
