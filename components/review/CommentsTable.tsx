"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Popconfirm, message } from "antd";

import { RenderExpired, formatDateTime } from "@/utils";
import DiscountApi from "@/api-client/discount";
import { FaStar } from "react-icons/fa";
import ReviewApi from "@/api-client/review";

const itemPerPage = 5;

type TableThreeType = {
  title?: string;
  data?: any;
  isShow?: boolean;
};
interface IReview {
  status: boolean;
  id: number;
  star: number;
  user_id: number;
  product_id: number;
  content: string;
  listImage: string;
  updatedAt: string;
  createdAt: string;
  Product: {
    name: string;
  };
}
const ReviewScreen = () => {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [listReview, setListReview] = useState<IReview[]>([]);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    ReviewApi.GetAll(itemPerPage, (pageCurrent - 1) * itemPerPage).then(
      (res: any) => {
        setListReview(() => res.data.listReview);
        setTotal(() => res.data.total);
      }
    );
  }, [pageCurrent, total]);

  const handleDelete = (data: IReview) => {
    if (data.id) {
      ReviewApi.DeleteReview(data.id)
        .then((res: any) => {
          message.success(res.message);
          setListReview((prev) => prev.filter((item) => item.id != data.id));
          setTotal((prev) => prev - 1);
        })
        .catch((err) => {
          message.error(err?.message || "Xóa Đánh giá thất bại");
        });
    } else {
      message.error("Xóa Đánh giá thất bại");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tên sản phẩm
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Số sao
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nội dung
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white text-center">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {listReview.map((item) => (
              <tr key={`contact-${item.id}`}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white capitalize">
                    {item.Product.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white flex gap-1 items-center">
                    {item.star}{" "}
                    <span className="text-yellow-400">
                      <FaStar />
                    </span>
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.content}</p>
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
      <div className="flex justify-center items-center my-2">
        <Pagination
          total={total}
          pageSize={itemPerPage}
          current={pageCurrent}
          onChange={(page) => setPageCurrent(page)}
        />
      </div>
    </div>
  );
};

export default ReviewScreen;
