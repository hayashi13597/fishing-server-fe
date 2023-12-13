"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/Users/Table";
import UserApi from "@/api-client/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const UserAccount = () => {
  const [listAccount, setListAccount] = useState([]);
  const account = useSelector((state: RootState) => state.account.account);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Quản lý tài khoản";
    }
    if (account.id) {
      UserApi.GetAll().then((res) => {
        setListAccount(() => res.data.accounts);
      });
    }
  }, [account.id]);
  return (
    <>
      <Breadcrumb pageName="Tài khoản" />
      <div className="flex flex-col gap-10">
        <Table setData={setListAccount} data={listAccount} />
      </div>
    </>
  );
};

export default UserAccount;
