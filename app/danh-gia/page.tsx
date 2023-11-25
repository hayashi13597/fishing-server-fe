import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";

import CommentsTable from "@/components/review/CommentsTable";

const ReviewScreen = () => {
  return (
    <>
      <Breadcrumb pageName="Đánh giá" />
      <div className="flex flex-col gap-10">
        <CommentsTable />
      </div>
    </>
  );
};

export default ReviewScreen;
