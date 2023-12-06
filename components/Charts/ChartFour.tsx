"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductsApi from "@/api-client/product";
import LoadingContainer from "../common/LoadingContainer";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartFourState {
  series: { data: number[] }[];
}

const ChartFour: React.FC = () => {
  const [isLoadding, setLoading] = useState(false);
  useEffect(() => {
    ProductsApi.getChart()
      .then((res: any) => {
        if (res?.data.listTotal) {
          updateState(res.data.listTotal);
        }
      })
      .finally(() => {
        setLoading(() => true);
      });
  }, []);
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  // Update the state
  const updateState = (data) => {
    setState(() => ({
      series: [
        {
          data,
        },
      ],
    }));
  };

  const options: ApexOptions = {
    colors: ["#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 11, 12],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",

      markers: {
        radius: 99,
      },
    },
    // yaxis: {
    //   title: false,
    // },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      // y: {
      //   formatter: function (val) {
      //     return val;
      //   },
      // },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Doanh thu tạm tính 12 tháng
        </h3>
      </div>

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          {!isLoadding ? (
            <></>
          ) : (
            <ApexCharts
              options={options}
              series={state.series}
              type="bar"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
