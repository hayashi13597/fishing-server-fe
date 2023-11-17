"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { UploadCategory } from "@/redux/category/CategorySlicer";
import { RootState } from "@/redux/store";
import CateGoriTable from "./category.table";
// import categories from "@/mock/categories.json";

const Category = () => {
  const listCate = useSelector((state: RootState) => state.cate.listCate);
  const [listCategories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCategories(listCate);
    dispatch(UploadCategory(listCate));
  }, [listCate.length]);
  return (
    <>
      <Breadcrumb pageName="Danh mục" />
      <div className="flex flex-col gap-10">
        <CateGoriTable
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
