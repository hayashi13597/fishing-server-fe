"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/News/Table";
import React, { useEffect, useState } from "react";
import NewApi from "@/api-client/new/";

const NewsAndEvents = () => {
  const [ListNews, setListNews] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Quản lý tin tức";
    }

    NewApi.GetAll().then((res) => {
      setListNews(() => res.data.events);
    });
  }, []);
  return (
    <>
      <Breadcrumb pageName="Tin tức - Sự kiện" />
      <div className="flex flex-col gap-10">
        <Table setData={setListNews} title="tin tức" data={ListNews} />
      </div>
    </>
  );
};

export default NewsAndEvents;
