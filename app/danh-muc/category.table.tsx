"use client";
import { useState } from "react";
import { formatDateTime, formatMoney } from "@/utils";
import Image from "next/image";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Popconfirm, message } from "antd";

import CategoriApi from "@/api-client/category";

import FormComponent from "./FormComponent";
import ModalComponent from "./ModalComponent";
import { useDispatch } from "react-redux";
import { UploadCategory } from "@/redux/category/CategorySlicer";
const itemPerPage: number = 5;

type TableThreeType = {
  title?: string;
  data?: any;
  isShow?: boolean;
  setData: any;
};

const CateGoriTable = ({
  title,
  data,
  isShow = true,
  setData,
}: TableThreeType) => {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const showModal = (category: any) => {
    setIsModalOpen(true);
    setSelected(category);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showAddForm = () => {
    setIsAdd(true);
  };

  const closeAddFrom = () => {
    setIsAdd(false);
  };

  const showEditForm = (product: any) => {
    setIsEdit(true);
    setSelected(product);
    console.log(product);
  };

  const closeEditFrom = () => {
    setIsEdit(false);
  };

  const handleDelete = (data: any) => {
    if (data.id) {
      CategoriApi.delete(data.id)
        .then(() => {
          message.success("Xóa thành công");
          setData((prev: any[]) => {
            const listcate = prev.filter((item) => item.id != data.id);
            dispatch(UploadCategory(listcate));
            return listcate;
          });
        })
        .catch(() => {
          message.error("Xóa thất bại");
        });
    }
  };
  console.log(itemPerPage, data?.length);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-end mb-5">
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={showAddForm}
          >
            Thêm {title}
          </button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Tên {title}
              </th>
              {isShow && (
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Danh mục
                </th>
              )}
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Ngày đăng
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Trạng thái
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center">
                Tác vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice(
                (pageCurrent - 1) * itemPerPage,
                pageCurrent * itemPerPage
              )
              .map((category: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11 flex items-center gap-2">
                    <div className="h-12.5 w-15 rounded-md hidden md:block">
                      <Image
                        src={category.imageUrl}
                        width={60}
                        height={50}
                        alt={category.name}
                      />
                    </div>
                    <div className="">
                      <h5 className="font-medium text-black dark:text-white capitalize">
                        {category.name}
                      </h5>
                      <p className="text-sm">{formatMoney(category.price)}</p>
                    </div>
                  </td>
                  {isShow && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white capitalize">
                        {category.name}
                      </p>
                    </td>
                  )}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDateTime(category.createdAt)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        category.visiable
                          ? "text-success bg-success"
                          : "text-danger bg-danger"
                      }`}
                    >
                      {category.visiable ? "Hiện" : "Ẩn"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className={`flex items-center justify-center ${
                        title == "danh mục" ? "gap-3" : ""
                      }`}
                    >
                      <button
                        className="hover:text-primary"
                        onClick={() => showModal(category)}
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
                        onClick={() => showEditForm(category)}
                      >
                        <CiEdit />
                      </button>
                      <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => handleDelete(category)}
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
        {data?.length > 0 && (
          <div
            className={` justify-center py-5 md:py-4 ${
              itemPerPage > data?.length ? "!hidden" : "flex"
            }`}
          >
            <Pagination
              defaultCurrent={pageCurrent}
              total={data?.length}
              pageSize={itemPerPage}
              current={pageCurrent}
              onChange={(page) => setPageCurrent(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
      {selected && (
        <ModalComponent
          selected={selected}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
      {isAdd && (
        <FormComponent
          type="add"
          title={title}
          isOpen={isAdd}
          setData={setData}
          closeModal={closeAddFrom}
        />
      )}
      {isEdit && (
        <FormComponent
          type="edit"
          title={title}
          isOpen={isEdit}
          selected={selected}
          setData={setData}
          closeModal={closeEditFrom}
        />
      )}
    </div>
  );
};

export default CateGoriTable;
