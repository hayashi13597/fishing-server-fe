import React from "react";
import { Button, Modal } from "antd";
import { formatDateTime } from "@/utils";
import Image from "next/image";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const CommentModal = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const { id, user_id, products_id, comment, createdAt, updatedAt } = selected;

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        width={800}
        footer={[
          <Button key="back" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        <div className="relative rounded-lg dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center gap-3 p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div
              style={{ width: "50px", height: "50px", position: "relative" }}
            >
              <Image src={`/assets/user-avt.png`} fill alt="user avatar" />
            </div>
            <div className="">
              <p className="font-medium text-base">Hồ Phúc Lâm</p>
              <p className="font-medium text-sm">{formatDateTime(createdAt)}</p>
            </div>
          </div>
          {/* Modal header */}

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {comment}
            </p>
          </div>
          {/* Modal Body */}
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;
