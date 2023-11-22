"use client";
import React, { useState } from "react";
import { cn } from "react-swisskit";
import ImageItem from "./ImageItem";
import UploadImageApi from "@/api-client/uploadfile";
import { message } from "antd";

interface ImageContainer {
  listImage: IImage[];
  setListImage: any;
}
export interface IImage {
  imageUrl: string;
  idPath: string;
}
const ImageContainer = ({ setListImage, listImage }: ImageContainer) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleDeletefile = (idPath: string) => {
    UploadImageApi.delete(idPath)
      .then(() => {
        message.success("Xóa ảnh thành công");
        setListImage((prev: any[]) =>
          prev.filter((item) => item.idPath !== idPath)
        );
      })
      .catch(() => {
        message.error("Xóa ảnh  thất bại");
      });
  };
  const handleUpload = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      UploadImageApi.add(formData)
        .then((res: any) => {
          message.success("Tải ảnh thành công");

          setListImage((prev: any[]) => [
            ...prev,
            { idPath: res.idPath, imageUrl: res.imageUrl },
          ]);
        })
        .catch(() => {
          message.error("Tải ảnh thất bại");
        });
    }
  };
  return (
    <div className={cn(`relative z-50  my-4 min-h-[40px]`)}>
      <button
        type="button"
        onClick={() => setIsHidden(!isHidden)}
        className="bg-secondary hover:bg-primary hover:text-white py-2 px-5 rounded-full m-2 absolute top-1 right-1 z-50"
      >
        {isHidden ? "Hiện" : "Ẩn"}
      </button>
      <section className={cn(isHidden ? "hidden" : "", "border")}>
        <h1 className="text-center text-lg ">Danh sách ảnh cần sử dụng</h1>
        <div className="flex my-8 ">
          <label
            htmlFor="uploadcontentimage"
            className="m-auto w-32 h-32w-32 p-4 border-dashed  border text-center cursor-pointer "
          >
            Tải ảnh lên
          </label>
        </div>
        <input
          onChange={handleUpload}
          id="uploadcontentimage"
          type="file"
          className="!hidden"
        />
        <div className="grid md:grid-cols-3 grid-cols-2">
          {listImage.map((item) => (
            <ImageItem
              imageUrl={item.imageUrl}
              path={item.idPath}
              key={item.idPath}
              handleDeletefile={handleDeletefile}
              setListInmage={setListImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImageContainer;
