"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Popconfirm, message } from "antd";

import ContactApi from "@/api-client/contact";
import { FaRegPaperPlane } from "react-icons/fa";
import { RenderExpired, formatDateTime } from "@/utils";
import DiscountApi from "@/api-client/discount";
import AddDiscount from "./FormComponent";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import { cn } from "react-swisskit";

const itemPerPage = 5;

type TableThreeType = {
  title?: string;
  data?: any;
  isShow?: boolean;
};
interface IDiscount {
  id: number;
  code: string;
  value: number;
  expirydate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
const DiscountScreen = () => {
  const [pageCurrent, setPageCurrent] = useState(1);

  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [listDiscount, setListDiscount] = useState<IDiscount[]>([]);

  const [total, setTotal] = useState(1);
  useEffect(() => {
    DiscountApi.GetAll(itemPerPage, (pageCurrent - 1) * itemPerPage).then(
      (res: any) => {
        setListDiscount(() => res.data.listDiscount);
        setTotal(() => res.data.total);
      }
    );
  }, [pageCurrent, isEdit, total]);

  const showAddForm = (contact: any) => {
    setIsEdit(true);
    setSelected(contact);
  };

  const closeAddFrom = () => {
    setIsEdit(false);
  };

  const handleDelete = (data: IDiscount) => {
    if (data.id) {
      DiscountApi.DeleteDiscount(data.id)
        .then((res: any) => {
          message.success(res.message);
          setListDiscount((prev) => prev.filter((item) => item.id != data.id));
          setTotal((prev) => prev - 1);
        })
        .catch((err) => {
          message.error(err?.message || "Xóa mã giảm giá thất bại");
        });
    } else {
      message.error("Xóa mã giảm giá thất bại");
    }
  };
  const onSearch: SearchProps["onSearch"] = (value) => {
    DiscountApi.Search(value).then((res: any) => {
      setListDiscount(() => {
        return res.data.discounts;
      });
    });
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between py-5">
        <form onSubmit={(e) => e.preventDefault()}>
          <Search
            placeholder="Tìm kiếm mã giảm giá"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
          />
        </form>
        <div className="flex ">
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={showAddForm}
          >
            Thêm mã giảm giá
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Mã giảm giá
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Giá trị
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Hạn sử dụng
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
            {listDiscount.map((item) => (
              <tr key={`contact-${item.id}`}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">#{item.code}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.value}%</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.expirydate
                      ? RenderExpired(item.expirydate)
                      : "Vô thời hạn"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status
                        ? "text-success bg-success"
                        : "text-warning bg-danger"
                    }`}
                  >
                    {item.status ? "Đã  sử dụng" : "Chưa sử dụng"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center gap-3">
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
      </div>
      <div
        className={cn(
          " justify-center items-center my-2",
          total > itemPerPage ? "flex" : "hidden"
        )}
      >
        <Pagination
          total={total}
          pageSize={itemPerPage}
          current={pageCurrent}
          onChange={(page) => setPageCurrent(page)}
            showSizeChanger={false}
        />
      </div>
      {isEdit && (
        <AddDiscount
          type="edit"
          title="Liên hệ"
          isOpen={isEdit}
          selected={selected}
          closeModal={closeAddFrom}
          setData={setListDiscount}
        />
      )}
    </div>
  );
};

export default DiscountScreen;
