"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartFour from "@/components/Charts/ChartFour";
// import ChartOne from "@/components/Charts/ChartOne";
// import ChartThree from "@/components/Charts/ChartThree";
// import ChartTwo from "@/components/Charts/ChartTwo";
import { RootState } from "@/redux/store";

import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ChartDashboard = () => {
  const account = useSelector((state: RootState) => state.account.account);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Quản lý Biểu đồ hàng hóa";
    }
  }, []);
  return (
    <>
      <Breadcrumb pageName="Biểu đồ doanh thu" />
      <Head>
        <title>Biểu đồ</title>
      </Head>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">{account.id && <ChartFour />}</div>
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default ChartDashboard;
