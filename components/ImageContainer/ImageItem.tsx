"use client";
import { checkImageExist } from "@/utils";
import { Skeleton, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

import { BiDownload } from "react-icons/bi";
const ImageItem: React.FC<{
  imageUrl: string;
  path?: string;
  handleDeletefile?: (path: string) => void;
  setListInmage: (prev: any) => any;
}> = ({ imageUrl, path, handleDeletefile, setListInmage }) => {
  console.log("imageUrl, path,", imageUrl, path);
  const [isLoadding, setIsloadding] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const handleCopy = (kind: number) => {
    const text = kind == 1 ? imageUrl : `linkimage${imageUrl}linkimage`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Copy thành công!");
      })
      .catch(() => {
        message.error("Copy thất bại!");
      });
  };
  const divRef = useRef<HTMLDivElement>(null);

  const handleHideBox = () => {
    if (divRef.current) {
      divRef.current.classList.add("hidden");
      setListInmage(
        (prev: any) => prev.filter((item: any) => item != imageUrl) || prev
      );
    }
  };
  const handleDeleteUpLoadImage = () => {
    path && handleDeletefile && handleDeletefile(path);
    if (divRef.current) {
      divRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    if (!imageUrl) return;

    checkImageExist(imageUrl)
      .then((exists) => {
        if (exists) {
          setIsloadding(false);
        } else {
          setIsHidden(true);
          handleHideBox();
        }
      })
      .catch(() => {
        setIsHidden(true);
        handleHideBox();
      });
  }, []);
  if (isHidden) return <></>;
  if (isLoadding) return <Skeleton active />;

  return (
    <div ref={divRef} className="border p-4 relative">
      <button
        onClick={handleHideBox}
        className="absolute -top-3 -right-3 bg-red-400  hover:bg-red-600 text-white rounded-full border px-3"
        type="button"
      >
        X
      </button>
      <Image
        className="w-full h-auto max-h-[150px] object-cover "
        src={imageUrl}
        width={100}
        height={100}
        alt="lỗi ảnh"
      />
      <p className="mt-2 cursor-pointe  text-sm  flex flex-col i">
        <span>Link ảnh:</span>
        <button
          onClick={() => handleCopy(2)}
          type="button"
          className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-green-800  hover:bg-green-600 text-white"
        >
          Sao chép
        </button>
      </p>
      {/* <p className="mt-4 cursor-pointer text-sm flex flex-col">
        <span> Ảnh dán vào nội dung:</span>
        <button
          onClick={() => handleCopy(2)}     type="button"
          className="py-2 px-3 cursor-pointer  sm:w-32 mt-2 text-sm rounded-full bg-green-600 hover:bg-green-800 text-white"
        >
          Copy Ảnh Edit
        </button>
      </p> */}
      <p className="my-0 flex items-center">
        {!path && (
          <Link
            download="Tải về máy"
            target="_blank"
            className=" item-center gap-2 text-base inline-flex mt-3 text-center justify-center text-white"
            href={imageUrl}
          >
            Tải về máy
          </Link>
        )}
      </p>
      {path && (
        <p className="mt-4 cursor-pointer text-sm flex justify-center flex-col">
          <button
            type="button"
            onClick={handleDeleteUpLoadImage}
            className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-red-800 hover:bg-red-600 text-white"
          >
            Xóa Ảnh
          </button>
        </p>
      )}
    </div>
  );
};

export default ImageItem;
