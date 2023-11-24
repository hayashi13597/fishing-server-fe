import React from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import { formatDateTime, formatMoney } from "@/utils";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const NewsModal = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const {
    title,
    imageUrl,
    time_end,
    createdAt,
    visible,
    description,
    isEvent,
    content,
    User,
    visiable,
  } = selected;
  console.log(selected);
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={closeModal}
        width={800}
        footer={[
          <Button key="back" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        <div className="flex gap-5 py-3">
          <div
            className="w-1/4 md:w-1/3"
            style={{ width: "250px", height: "250px", position: "relative" }}
          >
            <Image
              src={imageUrl}
              fill
              alt="test"
              className="w-full object-contain"
            />
          </div>
          <div className="w-2/3">
            <h3 className="text-xl">
              Tiêu đề: <span className="font-semibold">{title}</span>
            </h3>
            <h3 className="mt-1 md:mt-3 line-clamp-3">
              <span className="font-medium">Mô tả:</span> {description}
            </h3>
            <h3 className="mt-1 md:mt-3">
              <span className="font-medium">Người đăng:</span> {User?.fullname}
            </h3>
            <div className="mt-1 md:mt-3 line-clamp-3 flex gap-2">
              <span className="font-medium">Nội dung:</span>{" "}
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              <span className="font-medium mr-1">Ngày đăng:</span>{" "}
              <br className="block md:hidden" /> {formatDateTime(createdAt)}
            </p>
            <p className="mt-1 md:mt-3">
              <span className="font-medium mr-1">Trạng thái:</span>
              <span
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium ${
                  visiable ? "text-success bg-success" : "text-danger bg-danger"
                }`}
              >
                {visiable ? "Hoạt động" : "Khóa"}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewsModal;
