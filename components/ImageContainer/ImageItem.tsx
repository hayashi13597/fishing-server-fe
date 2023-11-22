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
    if (path) {
      setListInmage(
        (prev: any) => prev.filter((item: any) => item.path != path) || [prev]
      );
      return;
    }
    if (divRef.current) {
      divRef.current.classList.add("hidden");
      setListInmage(
        (prev: any) => prev.filter((item: any) => item != imageUrl) || [prev]
      );
      message.success("Xóa thành công!");
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
        className="absolute -top-3 -right-3 bg-red-500  hover:bg-red-700 rounded-full border px-3"
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
          onClick={() => handleCopy(1)}
          type="button"
          className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-yellow-600 hover:bg-yellow-800"
        >
          Copy Link
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
          <span> Nhớ xóa nếu không sử dụng nhé!</span>
          <button
            type="button"
            onClick={handleDeleteUpLoadImage}
            className="py-2 px-3 cursor-pointer sm:w-32 mt-2 text-sm rounded-full bg-red-600 hover:bg-red-800 "
          >
            Xóa Ảnh
          </button>
        </p>
      )}
    </div>
  );
};

export default ImageItem;
