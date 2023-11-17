"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import CategoriApi from "@/api-client/category";
// import categories from "@/mock/categories.json";

const Category = () => {
  const [listCategories, setCategories] = useState([]);
  useEffect(() => {
    CategoriApi.getAll().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);
  console.log("listCategories", listCategories);
  return (
    <>
      <Breadcrumb pageName="Danh mục" />
      <div className="flex flex-col gap-10">
        <TableThree
          title="danh mục"
          setData={setCategories}
          data={listCategories}
          isShow={false}
        />
      </div>
    </>
  );
};

export default Category;
