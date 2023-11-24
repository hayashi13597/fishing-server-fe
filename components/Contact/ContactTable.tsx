"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Popconfirm, message } from "antd";
import FormComponent from "./FormComponent";

import ContactApi from "@/api-client/contact";
import { FaRegPaperPlane } from "react-icons/fa";

const itemPerPage = 5;

type TableThreeType = {
  title?: string;
  data?: any;
  isShow?: boolean;
};
interface IContact {
  id: number;
  fullname: string;
  email: string;
  content: string;
  phone: string;
  status: boolean;

  createdAt: string;
  updatedAt: string;
}

const ContactTable = ({ data }: TableThreeType) => {
  const [pageCurrent, setPageCurrent] = useState(1);

  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [ListContact, setListContact] = useState<IContact[]>([]);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    ContactApi.GetAll(itemPerPage, (pageCurrent - 1) * itemPerPage).then(
      (res: any) => {
        setListContact(() => res.data.listContact);
        setTotal(() => res.data.total);
      }
    );
  }, [pageCurrent, isEdit]);

  const showEditForm = (contact: any) => {
    setIsEdit(true);
    setSelected(contact);
  };

  const closeEditFrom = () => {
    setIsEdit(false);
  };

  const handleDelete = (data: IContact) => {
    if (data.id) {
      ContactApi.DeleteContact(data.id)
        .then((res: any) => {
          message.success(res.message);
          setListContact((prev) => prev.filter((item) => item.id != data.id));
          setTotal((prev) => prev - 1);
        })
        .catch((err) => {
          message.error(err?.message || "Xóa liên hệ thất bại!");
        });
    } else {
      message.error("Xóa liên hệ thất bại!");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Họ và tên
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Số điện thoại
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nội dung
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
            {ListContact.map((item) => (
              <tr key={`contact-${item.id}`}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.fullname}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.phone}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.content}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status
                        ? "text-success bg-success"
                        : "text-warning bg-danger"
                    }`}
                  >
                    {item.status ? "Đã liện hệ" : "Chưa liên hệ"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="hover:text-primary text-xl"
                      onClick={() => showEditForm(item)}
                    >
                      <FaRegPaperPlane />
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
        <div className="flex justify-center items-center mt-2">
          <Pagination
            total={total}
            pageSize={itemPerPage}
            current={pageCurrent}
            onChange={(page) => setPageCurrent(page)}
          />
        </div>
      </div>

      {isEdit && (
        <FormComponent
          type="edit"
          title="Liên hệ"
          isOpen={isEdit}
          selected={selected}
          closeModal={closeEditFrom}
          setData={setListContact}
        />
      )}
    </div>
  );
};

export default ContactTable;
