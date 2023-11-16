import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import OrdersTable from "@/components/Orders/OrdersTable";
import React from "react";

import orders from "@/mock/orders.json";

const Orders = () => {
  return (
    <>
      <Breadcrumb pageName="Hóa đơn" />
      <div className="flex flex-col gap-10">
        <OrdersTable title="hóa đơn" data={orders} />
      </div>
    </>
  );
};

export default Orders;
