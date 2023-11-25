"use client";
import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Popconfirm, message } from "antd";
import FormComponent from "./FormComponent";
import OrderModal from "./OrderModal";
import OrderApi from "@/api-client/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Search, { SearchProps } from "antd/es/input/Search";

const itemPerPage: number = 5;

interface IOrderDetail {
  id: number;
  email: string;
  codebill: string;
  fullname: string;
  address: string;
  phone: string;
  shipping_fee: string;
  payment_method: string;
  status: string;
  user_id: 2;
  discount_id: string;
  createdAt: string;
  updatedAt: string;
}

export enum StatusPay {
  "s1" = "Chờ xử lý",
  "s2" = "Đã kiểm duyệt",
  "s3" = "Đang giao hàng",
  "s4" = "Thành công",
  "s5" = "Thất bại",
}
const OrdersTable = () => {
  const account = useSelector((state: RootState) => state.account.account);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageCurrentModal, setPageCurrentModal] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [ListOrder, setListOrder] = useState<IOrderDetail[]>([]);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (!account.id) return;
    OrderApi.GetAll(itemPerPage, (pageCurrent - 1) * itemPerPage).then(
      (res: any) => {
        setListOrder(() => res.data.orders);
        setTotal(() => res.data.total);
      }
    );
  }, [pageCurrent, account.id]);

  const showModal = (product: any) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPageCurrentModal(1);
  };

  const showEditForm = (product: any) => {
    setIsEdit(true);
    setSelected(product);
  };

  const closeEditFrom = () => {
    setIsEdit(false);
  };

  const handleDelete = (data: any) => {
    if (data.id) {
      OrderApi.DeleteOrder(data.id)
        .then((res: any) => {
          message.success(res.message);
          setTotal((prev) => prev - 1);
          setListOrder((prev) => [
            ...prev.filter((item) => item.id != data.id),
          ]);
        })
        .catch(() => {
          message.error("Xóa hóa đơn thất bại");
        });
    } else {
      message.error("Xóa hóa đơn thất bại");
    }
  };
  const onSearch: SearchProps["onSearch"] = (value) => {
    OrderApi.Search(value).then((res: any) => {
      setListOrder(() => {
        return res.data.orders;
      });
    });
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between py-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <Search
            placeholder="Tìm kiếm hóa đơn"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
          />
        </form>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Mã hóa đơn
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tên khách hàng
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sô điện thoại
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Địa chỉ
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Trạng thái
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {ListOrder.map((item) => (
              <tr key={`order-${item.codebill}`}>
                <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                  <h5 className="font-medium  text-black dark:text-white text-center">
                    # {item.codebill}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.fullname}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.phone}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.address}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === "s4"
                        ? "text-success bg-success"
                        : item.status === "s5"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                    }`}
                  >
                    {StatusPay[item.status]}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="hover:text-primary"
                      onClick={() => showModal(item)}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button
                      className="hover:text-primary text-xl"
                      onClick={() => showEditForm(item)}
                    >
                      <CiEdit />
                    </button>
                    <Popconfirm
                      title="Bạn có chắc muốn xóa không?"
                      onConfirm={() => handleDelete(item)}
                      okText="Xác nhận"
                      cancelText="Hủy"
                      okType="danger"
                    >
                      <button className="hover:text-primary text-xl">
                        <CiTrash />
                      </button>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {total > 0 && (
          <div
            className={`flex justify-center py-5 md:py-4 S${
              itemPerPage >= ListOrder.length ? "hidden" : ""
            }`}
          >
            <Pagination
              defaultCurrent={pageCurrent}
              total={total}
              pageSize={itemPerPage}
              current={pageCurrent}
              onChange={(page) => setPageCurrent(page)}
            />
          </div>
        )}
      </div>
      {selected && (
        <OrderModal
          selected={selected}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          pageCurrentModal={pageCurrentModal}
          setPageCurrentModal={setPageCurrentModal}
        />
      )}
      {isEdit && (
        <FormComponent
          type="edit"
          title="hóa đơn"
          isOpen={isEdit}
          selected={selected}
          closeModal={closeEditFrom}
          setData={setListOrder}
        />
      )}
    </div>
  );
};

export default OrdersTable;
