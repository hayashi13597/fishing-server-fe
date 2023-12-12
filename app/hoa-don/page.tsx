import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrdersTable from "@/components/Orders/OrdersTable";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý hóa đơn",
};
if (typeof window !== "undefined") {
  document.title = "Quản lý Sản phẩm";
}
const Orders = () => {
  return (
    <>
      <Breadcrumb pageName="Hóa đơn" />
      <div className="flex flex-col gap-10">
        <OrdersTable />
      </div>
    </>
  );
};

export default Orders;
