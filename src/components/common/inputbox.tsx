"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./inputBox.module.css"; // 스타일 파일 연결

interface InputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  placeholder:string;
  disabled:boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ value, onChange, onSend, placeholder, disabled }) => {
  const [imgPath, setImgPath] = useState<string>('/assets/home/enter.webp');
  const inactivePath = '/assets/home/enter.webp'
  const activePath = '/assets/home/enter_Active.webp'

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !disabled) {
      event.preventDefault();
      onSend();
      setImgPath(inactivePath);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event); // 상위 컴포넌트에 입력 값 전달
    setImgPath(event.target.value.length > 0 ? activePath : inactivePath);
  };

  return (
    <div className={styles.inputBox}>
      {/* 텍스트 입력 */}
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyPress}
        disabled={disabled}
        onChange={handleChange}
      />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <div className={styles.icon}>
          <Image src="/assets/home/paperclip.webp" alt="Attach File" width={24} height={24} />
        </div>
        <div className={styles.icon} onClick={onSend}>
          <Image src={imgPath} alt="Submit" width={28} height={28} />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
