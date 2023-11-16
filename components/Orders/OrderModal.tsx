import React from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import { formatDateTime, formatMoney } from "@/utils";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
};

const OrderModal = ({ closeModal, isModalOpen, selected }: ModalType) => {
  const {
    id,
    user_id,
    status,
    order_detail_id,
    phone,
    address,
    codeBill,
    shipment,
    paymentMethod,
    createdAt,
    updatedAt,
  } = selected;

  return (
    <>
      <Modal
        title={`Thông tin đơn hàng #${id}`}
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
          <div className="w-2/3">
            <h3 className="mt-1 md:mt-3">
              <span className="font-medium">Mã đơn hàng: </span> #{id}
            </h3>
            <h3 className="mt-1 md:mt-3">
              <span className="font-medium">Tên khách hàng:</span> {user_id}
            </h3>
            <h3 className="mt-1 md:mt-3">
              <span className="font-medium">Số điện thoại:</span> {phone}
            </h3>
            <p className="mt-1 md:mt-3">
              <span className="font-medium">Địa chỉ:</span> {address}
            </p>
            <p className="mt-1 md:mt-3">
              <span className="font-medium">Mã bill:</span> {codeBill}
            </p>
            <p className="mt-1 md:mt-3">
              <span className="font-medium">Phương thức thanh toán:</span>{" "}
              {paymentMethod}
            </p>
            <p className="mt-1 md:mt-3 text-sm md:text-base">
              <span className="font-medium mr-1">Ngày đặt hàng:</span>{" "}
              <br className="block md:hidden" /> {formatDateTime(createdAt)}
            </p>
            <p className="mt-1 md:mt-3">
              <span className="font-medium mr-1">Trạng thái:</span>
              <span
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-2 text-sm font-medium ${
                  status === "payed"
                    ? "text-success bg-success"
                    : status === "canceled"
                    ? "text-danger bg-danger"
                    : "text-warning bg-warning"
                }`}
              >
                {status === "payed"
                  ? "Đã thanh toán"
                  : status === "canceled"
                  ? "Hủy"
                  : "Chưa thanh toán"}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
