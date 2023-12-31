import React from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import { formatDateTime } from "@/utils";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const UserModal = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const {
    email,

    fullname,
    visiable,
    role,
    avatar,
    createdAt,
    address,
    phone,
  } = selected;

  console.log(selected);
  return (
    <>
      <Modal
        title={"Thông tin tài khoản"}
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
              src={avatar || "/assets/user-avt.png"}
              fill
              alt="user avatar"
              className="w-full object-cover"
            />
          </div>
          <div className="w-2/3">
            <h3 className="text-xl">
              Email: <span className="font-semibold ">{email}</span>
            </h3>

            <p className="mt-1 md:mt-3">
              Họ và tên: <span className="font-semibold ">{fullname}</span>
            </p>
            <p className="mt-1 md:mt-3">
              Số điện thoại: <span className="font-semibold ">{phone}</span>
            </p>
            <p className="mt-1 md:mt-3">
              Địa chỉ: <span className="font-semibold ">{address}</span>
            </p>

            <p className="mt-1 md:mt-3">
              Vài trò: <span className="font-semibold ">{role}</span>
            </p>
            <p className="mt-1 md:mt-3">
              Trạng thái:{" "}
              <span
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium ${
                  visiable ? "text-success bg-success" : "text-danger bg-danger"
                }`}
              >
                {visiable ? "Hoạt động" : "Khóa"}
              </span>
            </p>

            <p className="mt-1 md:mt-3 text-sm md:text-base">
              Ngày đăng ký: <br className="block md:hidden" />{" "}
              <span className="font-semibold">{formatDateTime(createdAt)}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserModal;
