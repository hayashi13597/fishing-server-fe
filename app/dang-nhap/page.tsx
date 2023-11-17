import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LoginContent from "@/components/Login/LoginContent";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đây là trang đăng nhập của Câu cá Ốc Đảo",
};

const Login = () => {
  return (
    <>
      <Breadcrumb pageName="Đăng nhập" />
      <LoginContent />
    </>
  );
};

export default Login;
