import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactTable from "@/components/Contact/ContactTable";

import React from "react";

const page = () => {
  return (
    <div>
      <Breadcrumb pageName="Liên hệ" />
      <ContactTable />
    </div>
  );
};

export default page;
