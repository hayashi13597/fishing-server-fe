import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination } from "antd";
import Image from "next/image";
import { formatMoney } from "@/utils";

import products from "@/mock/products.json";
import OrderApi from "@/api-client/order";

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
  const { id, codebill, shipping_fee } = selected;

  const [total, setTotal] = useState(0);
  const [listOrderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    OrderApi.GetDetail(id).then((res) => {
      const listOr = res.data.orderdetails;
      setOrderDetail(listOr);
      setTotal(
        listOr.reduce((total, item) => {
          total += item.quantity * item.price;
          return total;
        }, shipping_fee)
      );
    });
  }, [codebill, id, shipping_fee]);
  return (
    <>
      <Modal
        title={`Thông tin đơn hàng #${codebill}`}
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
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {listOrderDetail
              .slice(
                itemPerPage * (pageCurrentModal - 1),
                itemPerPage * pageCurrentModal
              )
              .map((product) => (
                <tr key={`${product.codebill}-ss`}>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">{product.Product.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={product.Product.imageUrl}
                        alt={product.Product.name}
                        fill
                      />
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">{product.quantity}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <p className="text-black">
                      {formatMoney(product.price * product.quantity)}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <td colSpan={3}>
              <span className="ml-4 font-bold text-xl">Tổng tiền</span>
            </td>
            <td className="font-bold ">{formatMoney(total)}</td>
          </tfoot>
        </table>
        {listOrderDetail.length > itemPerPage && (
          <div className="flex justify-center mt-2">
            <Pagination
              defaultCurrent={1}
              total={listOrderDetail.length}
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
