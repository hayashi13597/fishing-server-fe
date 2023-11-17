"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { use, useState } from "react";

import productsss from "@/mock/products.json";
import ProductTable from "./product.table";

const Products = () => {
  const [products, setListProduct] = useState(productsss);
  return (
    <>
      <Breadcrumb pageName="Sản phẩm" />
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
