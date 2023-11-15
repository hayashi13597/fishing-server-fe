import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import TableThree from "@/components/Tables/TableThree";
import products from "@/mock/products.json";

const Products = () => {
  return (
    <>
      <Breadcrumb pageName="Sản phẩm" />
      <div className="flex flex-col gap-10">
        <TableThree title="sản phẩm" data={products} />
      </div>
    </>
  );
};

export default Products;
