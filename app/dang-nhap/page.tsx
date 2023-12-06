"use client";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import LoginContent from "@/components/Login/LoginContent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Login = () => {
  const account = useSelector((state: RootState) => state.account.account);
  const router = useRouter();
  if (account.id && account.role !== "member") {
    router.push("/");
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <LoginContent />
    </>
  );
};

export default Login;
