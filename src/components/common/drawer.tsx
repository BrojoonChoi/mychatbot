import { FC, useEffect, useState } from "react";
import styles from "./drawer.module.css";
import Image from "next/image";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

interface HistoryProps {
  link: string;
  inquiryDate: Date;
}

const Drawer: FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div
        className={styles.heyhey}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image
          alt="img_logo_lg"
          src="/assets/home/logo_lg.webp"
          width={91}
          height={26}
        />
        <p style={{fontSize:'2rem', fontWeight:'700'}}></p>
        <Image
          alt="btn"
          src="/assets/home/btn_close.webp"
          width={20}
          height={14}
          style={{ cursor: "pointer", marginLeft: "1rem" }}
          onClick={toggleDrawer}
        />
      </div>
      <div className={`${styles.container}`}>
        <ul>
          <li>

          </li>
        </ul>
      </div>
      {/* 최하단 버튼 영역 */}
      <div className={styles.bottom}>
        <button className={styles.signInButton}>Sign In</button>
        <button className={styles.signUpButton}>Sign Up</button>
      </div>
    </div>
  );
};

export default Drawer;
