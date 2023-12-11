"use client";
import { handleAttachToken } from "@/api-client";
import CategoriApi from "@/api-client/category";
import cookieClient from "@/api-client/cookie";
import LoginContent from "@/components/Login/LoginContent";
import { FetchFirstLoginWithToken } from "@/redux/account/AccountSlicer";
import { UploadCategory } from "@/redux/category/CategorySlicer";
import { AppDispatch, RootState } from "@/redux/store";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const LayoutGlobal = () => {
  const dispatch: AppDispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account.account);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = cookieClient.get("accessToken");
      if (accessToken) {
        handleAttachToken(accessToken);
        dispatch(FetchFirstLoginWithToken()).catch((res) => {
          message.error(res?.message || "Bạn không phải là admin");
        });
      }

      // share dữ liệu cataegoris
      CategoriApi.getAll().then((res) => {
        dispatch(UploadCategory(res.data.categories));
      });
    }
  }, [account.id]);

  if (account.id && account.role !== "member") {
    return <></>;
  }

  // else {
  //   router.push("/dang-nhap");
  // }
  return (
    <div className="fixed inset-0 bg-black z-[10] flex">
      <LoginContent />
    </div>
  );
};

export default LayoutGlobal;
