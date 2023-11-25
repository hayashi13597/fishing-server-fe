import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import { formatDateTime, formatMoney } from "@/utils";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const ModalComponent = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const {
    name,
    price,
    imageUrl,
    listSubimages = "",
    createdAt,
    visible,
    description,
    content,
  } = selected;

  let ListImage: any = [];

  if (listSubimages) {
    try {
      ListImage = JSON.parse(listSubimages || []) || [];
    } catch (error) {
      ListImage = [];
    }
  }

  const [CurrentImage, setCurrentImage] = useState(imageUrl);
  return (
    <>
      <Modal
        title={name}
        open={isModalOpen}
        onCancel={closeModal}
        className="z-30"
        width={800}
        footer={[
          <Button key="back" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        <div className="flex gap-5 py-3">
          <div
            className="w-1/3"
            style={{ width: "250px", height: "250px", position: "relative" }}
          >
            <Image
              src={CurrentImage}
              fill
              alt="test"
              className="w-full object-cover"
            />
            <div className="flex gap-2 absolute -bottom-12 left-0">
              {ListImage &&
                ListImage.length > 0 &&
                ListImage.map((img: any) => (
                  <Image
                    onClick={(e) => {
                      setCurrentImage(img.imageUrl);
                    }}
                    key={img.idPath}
                    src={img.imageUrl}
                    width={40}
                    height={40}
                    alt="test 2"
                    className="w-full object-cover cursor-pointer"
                  />
                ))}
            </div>
          </div>
          <div className="w-2/3">
            <h3 className="font-semibold text-xl capitalize">{name}</h3>
            <p className="mt-1 md:mt-3 font-medium text-lg text-meta-1">
              {formatMoney(price)}
            </p>
            <p className="mt-1 md:mt-3 line-clamp-3">{description}</p>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Danh mục:{" "}
              <span className="font-semibold capitalize">
                {selected?.Category?.name}
              </span>
            </p>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Ngày đăng: <br className="block md:hidden" />{" "}
              <span className="font-semibold">{formatDateTime(createdAt)}</span>
            </p>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Trạng thái:{" "}
              <span className="font-semibold"> {visible ? "Hiện" : "Ẩn"}</span>
            </p>
            Nội dung:
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
