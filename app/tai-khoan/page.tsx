"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/Users/Table";

import users from "@/mock/users.json";
import UserApi from "@/api-client/user";
const UserAccount = () => {
  const [listAfccount, setListAccount] = useState(users);
  useEffect(() => {
    UserApi.GetAll().then((res) => {
      setListAccount(() => res.data.accounts);
    });
  }, []);
  console.log(listAfccount);
  return (
    <>
      <Breadcrumb pageName="Tài khoản" />
      <div className="flex flex-col gap-10">
        <Table setData={setListAccount} data={listAfccount} />
      </div>
    </>
  );
};

export default UserAccount;
