import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DiscountScreen from "@/components/Discount/DiscountScreen";
import React from "react";

const page = () => {
  return (
    <div>
      <Breadcrumb pageName="Mã giảm giá" />
      <DiscountScreen />
    </div>
  );
};

export default page;
