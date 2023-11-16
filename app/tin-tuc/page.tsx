import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Table from "@/components/News/Table";
import React from "react";

import data from "@/mock/news_events.json";

const NewsAndEvents = () => {
  return (
    <>
      <Breadcrumb pageName="Tin tức - Sự kiện" />
      <div className="flex flex-col gap-10">
        <Table title="tin tức - sự kiện" data={data} />
      </div>
    </>
  );
};

export default NewsAndEvents;
