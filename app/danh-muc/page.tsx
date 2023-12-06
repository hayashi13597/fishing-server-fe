"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CateGoriTable from "./category.table";
import Head from "next/head";

const Category = () => {
  const listCate = useSelector((state: RootState) => state.cate.listCate);
  const [listCategories, setCategories] = useState(listCate);

  useEffect(() => {
    setCategories(() => listCate);
  }, [listCate.length]);
  return (
    <>
      <Breadcrumb pageName="Danh mục" />
      <Head>
        <title>Danh mục</title>
      </Head>
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
