"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { use, useEffect, useState } from "react";

import productsss from "@/mock/products.json";
import ProductTable from "./product.table";
import ProductsApi from "@/api-client/product";
import Head from "next/head";

const Products = () => {
  const [products, setListProduct] = useState([]);

  useEffect(() => {
    ProductsApi.getAll().then((res) => {
      setListProduct(res.data.products);
    });
  }, []);

  return (
    <>
      <Breadcrumb pageName="Sản phẩm" />
      <Head>Sản phẩm</Head>
      <div className="flex flex-col gap-10">
        <ProductTable
          setData={setListProduct}
          title="sản phẩm"
          data={products}
        />
      </div>
    </>
  );
};

export default Products;
