import React, { useState } from "react";
import { Button, Modal, Pagination } from "antd";
import Image from "next/image";
import { formatMoney } from "@/utils";

import products from "@/mock/products.json";

type ModalType = {
  closeModal?: () => void;
  selected: any;
  isModalOpen?: boolean;
  setPageCurrentModal?: any;
  pageCurrentModal?: number;
};

const itemPerPage: number = 3;

const OrderModal = ({
  closeModal,
  isModalOpen,
  selected,
  pageCurrentModal = 1,
  setPageCurrentModal,
}: ModalType) => {
  const { id } = selected;

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
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[200px] py-4 px-4 font-medium text-black">
                Tên sản phẩm
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                Hình ảnh
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Số lượng
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                Tổng tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.filter((product) => product.categoryId === id)
              .slice(
                (pageCurrentModal - 1) * itemPerPage,
                pageCurrentModal * itemPerPage
              )
              .map((product) => (
                <tr>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">{product.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        position: "relative",
                      }}
                    >
                      <Image src={product.imageUrl} alt={product.name} fill />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">{product.sell}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">
                      {formatMoney(product.price * product.sell)}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {products?.filter((product) => product.categoryId === selected.id)
          ?.length > 0 && (
          <div
            className={`w-full flex justify-center py-5 md:py-4 S${
              itemPerPage >=
              products?.filter((product) => product.categoryId === id)?.length
                ? "hidden"
                : ""
            }`}
          >
            <Pagination
              defaultCurrent={1}
              total={
                products?.filter(
                  (product) => product.categoryId === selected.id
                )?.length
              }
              pageSize={itemPerPage}
              current={pageCurrentModal}
              onChange={(page) => setPageCurrentModal(page)}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderModal;
