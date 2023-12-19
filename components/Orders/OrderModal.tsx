import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Popconfirm, message } from "antd";
import Image from "next/image";
import { formatMoney } from "@/utils";

import products from "@/mock/products.json";
import OrderApi from "@/api-client/order";
import { CiTrash } from "react-icons/ci";
import { cn } from "react-swisskit";

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
  const { id, codebill, shipping_fee, discount } = selected;

  const [total, setTotal] = useState(0);
  const [listOrderDetail, setOrderDetail] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
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
  }, [codebill, id, shipping_fee, isDelete]);
  const handleDeleteOrderDetail = (orderDetailId: number) => {
    orderDetailId &&
      OrderApi.DeleteOrderDetail(orderDetailId)
        .then((res: any) => {
          message.success(res.message);
          setOrderDetail((prev) =>
            prev.filter((item) => item.id != orderDetailId)
          );
          setIsDelete((prev) => !prev);
        })
        .catch((err) => {
          message.success(
            err?.message || "Xóa sản phẩm đơn hàng chi tiết thất bại"
          );
        });
  };
  return (
    <>
      <Modal
        title={`Thông tin đơn hàng #${codebill}`}
        open={isModalOpen}
        onCancel={closeModal}
        width={900}
        footer={[
          <Button key="back" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        <div className="max-w-full overflow-x-auto overflow-y-hidden">
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
                  Giá bán
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                  Số lượng
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black">
                  Thành tiền
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white text-center">
                  Tác vụ
                </th>
              </tr>
            </thead>
            <tbody>
              {listOrderDetail
                .slice(
                  itemPerPage * (pageCurrentModal - 1),
                  itemPerPage * pageCurrentModal
                )
                .map((order) => (
                  <tr key={`${order.Product.product_id}-order`}>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">{order.Product.name}</p>
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
                          src={order.Product.imageUrl}
                          alt={order.Product.name}
                          fill
                        />
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">{formatMoney(order.price)}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">{order.quantity}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4">
                      <p className="text-black">
                        {formatMoney(order.price * order.quantity)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => handleDeleteOrderDetail(order.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        okType="danger"
                      >
                        <button className="hover:text-primary text-xl">
                          <CiTrash />
                        </button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <td colSpan={4}>
                <span className="ml-4 font-bold text-xl block py-2">
                  Tổng tiền {discount ? `(Giảm giá ${discount}%)` : ""}
                </span>
              </td>
              <td className="font-bold ">
                {formatMoney(total * (1 - discount / 100))}
              </td>
            </tfoot>
          </table>

          <div
            className={cn(
              " justify-center mt-2",
              total > itemPerPage ? "flex" : "hidden"
            )}
          >
            <Pagination
              defaultCurrent={1}
              total={listOrderDetail.length}
              pageSize={itemPerPage}
              current={pageCurrentModal}
              onChange={(page) => setPageCurrentModal(page)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
