import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";

import EditorContent from "../Products/EditorContent";
import ContactApi from "@/api-client/contact";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DiscountApi from "@/api-client/discount";
import LoadingContainer from "../common/LoadingContainer";

type FieldType = {
  id: number;
  code: string;
  value: number;
  expirydate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

type FormComponentType = {
  title?: string;
  type?: string;
  isOpen?: boolean;
  closeModal?: () => void;
  selected: FieldType;
  setData?: any;
  id?: string;
};

const AddDiscount = ({
  isOpen,
  closeModal,
  selected,
  setData,
}: FormComponentType) => {
  const [form] = Form.useForm();
  const [isLoadding, setIsLoadding] = useState(false);
  const account = useSelector((state: RootState) => state.account.account);
  const onFinish = (values) => {
    if (!account.id) {
      return message.error("Bạn cần phải đăng nhập");
    }
    const expirydate = values.expirydate
      ? new Date(values.expirydate).toISOString()
      : "";
    setIsLoadding(() => true);
    DiscountApi.CreateDiscount(values.value, account.id, expirydate)
      .then((res: any) => {
        message.success(res.message);
        setData((prev) => [res.data.discount, ...prev]);
        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err.message || "Trả lời liên hệ thất bại");
      })
      .catch(() => {
        setIsLoadding(() => false);
      });
  };

  return (
    <Modal
      title={`Thêm mã giảm giá`}
      centered
      style={{ top: 20 }}
      open={isOpen}
      onCancel={closeModal}
      width={800}
      footer={<></>}
    >
      {isLoadding && <LoadingContainer />}
      <Form
        name="formComponent"
        form={form}
        labelCol={{ span: 5, style: { textAlign: "left" } }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 800 }}
        autoComplete="off"
        onFinish={onFinish}
        className="mt-5"
      >
        <Form.Item<FieldType>
          label="Giá trị"
          name="value"
          rules={[
            {
              required: true,
              message: "Giá trị mã giảm giá không được để trống!",
            },
          ]}
          initialValue={selected.value || 0}
        >
          <Input type="number" placeholder="Giá trị giảm giá" />
        </Form.Item>

        <Form.Item<FieldType>
          initialValue={
            selected.expirydate
              ? moment(selected?.expirydate).format("YYYY-MM-DD HH:mm:ss")
              : ""
          }
          label="Thời hạn"
          name="expirydate"
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 23, style: { alignItems: "end" } }}>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2.5 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit"
          >
            Thêm mã giảm giá
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDiscount;
