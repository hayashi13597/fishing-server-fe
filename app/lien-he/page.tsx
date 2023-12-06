import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactTable from "@/components/Contact/ContactTable";
import { Metadata } from "next";

import React from "react";
export const metadata: Metadata = {
  title: "Liên hệ",
};
const page = () => {
  return (
    <div>
      <Breadcrumb pageName="Liên hệ" />
      <ContactTable />
    </div>
  );
};

export default page;
