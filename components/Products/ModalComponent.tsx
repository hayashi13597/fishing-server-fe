import React from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import { formatDateTime, formatMoney } from "@/utils";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const ModalComponent = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const { name, price, imageUrl, categoryId, createdAt, visible, description } =
    selected;

  return (
    <>
      <Modal
        title={name}
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
            className="w-1/3"
            style={{ width: "250px", height: "250px", position: "relative" }}
          >
            <Image
              src={imageUrl}
              fill
              alt="test"
              className="w-full object-cover"
            />
          </div>
          <div className="w-2/3">
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="mt-1 md:mt-3 font-medium text-lg text-meta-1">
              {formatMoney(price)}
            </p>
            <p className="mt-1 md:mt-3 line-clamp-3">{description}</p>
            {categoryId && (
              <p className="mt-1 md:mt-3 text-sm md:text-base">
                Danh mục:{" "}
                <span className="font-semibold">
                  {categoryId === 1
                    ? "Cần câu"
                    : categoryId === 2
                    ? "Mồi câu"
                    : categoryId === 3
                    ? "Món nhậu"
                    : "Đồ uống"}
                </span>
              </p>
            )}
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Thời gian đăng: <br className="block md:hidden" />{" "}
              <span className="font-semibold">{formatDateTime(createdAt)}</span>
            </p>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Trạng thái:{" "}
              <span className="font-semibold"> {visible ? "Hiện" : "Ẩn"}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
