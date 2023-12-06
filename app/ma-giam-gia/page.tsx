import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DiscountScreen from "@/components/Discount/DiscountScreen";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Mã giám giá",
};
const page = () => {
  return (
    <div>
      <Breadcrumb pageName="Mã giảm giá" />
      <DiscountScreen />
    </div>
  );
};

export default page;
