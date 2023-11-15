import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import categories from "@/mock/categories.json";

const Category = () => {
  return (
    <>
      <Breadcrumb pageName="Danh mục" />
      <div className="flex flex-col gap-10">
        <TableThree title="danh mục" data={categories} isShow={false} />
      </div>
    </>
  );
};

export default Category;
