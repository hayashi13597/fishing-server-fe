import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/Users/Table";

import users from "@/mock/users.json";

const UserAccount = () => {
  return (
    <>
      <Breadcrumb pageName="Tài khoản" />
      <div className="flex flex-col gap-10">
        <Table data={users} />
      </div>
    </>
  );
};

export default UserAccount;
