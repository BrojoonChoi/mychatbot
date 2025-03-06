"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import './components.css';

export default function NavigationBar() {

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="nav-bar-main"
      variant="dark"
    >
      <Container fluid className="nav-container">
        <Navbar.Brand className="nav-logo">
          <Link href="/main#home" passHref >
            <Image
              src="/assets/home/logo_lg.webp"
              className="brand-logo"
              alt="seco-brand-logo"
              width={91}
              height={26}
              priority
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav navbar-light" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse-custom">
          <Nav style={{display:'flex', justifyContent:'center', alignItems:'center', flex:1}}>
            <Link href="#price" passHref className="nav-link-important">
              SERVICE
            </Link>
            <Link href="#price" passHref className="nav-link">
              REVIEW AI 무료진단
            </Link>
            <Link href="#price" passHref className="nav-link">
              캠페인 사이트
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}