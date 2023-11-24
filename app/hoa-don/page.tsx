import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrdersTable from "@/components/Orders/OrdersTable";
import React from "react";

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
