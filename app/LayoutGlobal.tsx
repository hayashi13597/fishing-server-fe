import CategoriApi from "@/api-client/category";
import LoginContent from "@/components/Login/LoginContent";
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
  return (
    <div className="fixed inset-0 bg-black z-[10000] flex">
      <LoginContent />
    </div>
  );
};

export default LayoutGlobal;
