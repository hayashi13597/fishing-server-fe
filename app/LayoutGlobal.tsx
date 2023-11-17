import CategoriApi from "@/api-client/category";
import { UploadCategory } from "@/redux/category/CategorySlicer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const LayoutGlobal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // share dữ liệu cataegoris
    CategoriApi.getAll().then((res) => {
      dispatch(UploadCategory(res.data.categories));
    });
  }, []);
  return <></>;
};

export default LayoutGlobal;
