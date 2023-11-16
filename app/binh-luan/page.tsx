import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";

import comments from "@/mock/comments.json";
import CommentsTable from "@/components/Comment/CommentsTable";

const Comment = () => {
  return (
    <>
      <Breadcrumb pageName="Hóa đơn" />
      <div className="flex flex-col gap-10">
        <CommentsTable title="bình luận" data={comments} />
      </div>
    </>
  );
};

export default Comment;
