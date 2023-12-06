"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartFour from "@/components/Charts/ChartFour";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import ChartTwo from "@/components/Charts/ChartTwo";
import { RootState } from "@/redux/store";
import type { Metadata } from "next";
import { useSelector } from "react-redux";

const ChartDashboard = () => {
  const account = useSelector((state: RootState) => state.account.account);
  return (
    <>
      <Breadcrumb pageName="Biểu đồ doanh thu" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">{account.id && <ChartFour />}</div>
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default ChartDashboard;
