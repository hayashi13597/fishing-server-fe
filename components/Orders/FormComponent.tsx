import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { StatusPay } from "./OrdersTable";
import OrderApi from "@/api-client/order";

const { Option } = Select;

type FieldType = {
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
};

type FormComponentType = {
  title?: string;
  type?: string;
  isOpen?: boolean;
  closeModal?: () => void;
  selected?: any;
  setData?: any;
  id?: string;
};

const FormComponent = ({
  title,
  type,
  isOpen,
  closeModal,
  selected,
  setData,
}: FormComponentType) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.id = selected.id;
    const { fullname, address, id, shipping_fee, phone, status } = values;
    OrderApi.EditOrder(id, {
      fullname,
      address,
      shipping_fee,
      phone,
      status,
      user_id: selected.user_id,
      codebill: selected.codebill,
    })
      .then((res: any) => {
        setData((prev) => [
          res.data.order,
          ...prev.filter((item) => item.id != selected.id),
        ]);
        message.success(res.message);
        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err?.message || "Thay đổi hóa đơn tất bại");
      });
  };

  return (
    <Modal
      title={`${type === "add" ? "Thêm" : "Thông tin "} ${title}`}
      centered
      style={{ top: 20 }}
      open={isOpen}
      onCancel={closeModal}
      width={800}
      footer={<></>}
    >
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
          label="Mã đơn hàng"
          name="id"
          initialValue={selected?.codebill}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label="Tên khách hàng"
          name="fullname"
          initialValue={selected?.fullname}
          rules={[
            {
              required: selected?.fullname ? true : false,

              message: "Tên khách hàng không được bỏ trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          initialValue={selected?.phone}
          rules={[
            {
              required: selected?.phone ? true : false,
              min: 9,
              message: "Số điện thoại chưa đúng định dạng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Địa chỉ"
          name="address"
          initialValue={selected?.address}
          rules={[
            {
              required: selected?.address ? true : false,

              message: "Địa chỉ không được bỏ trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Trạng thái thanh toán"
          name="status"
          initialValue={selected?.status}
          rules={[
            {
              required: true,
              message: "Trạng thái thanh toán không được để trống!",
            },
          ]}
        >
          <Select
            className="capitalize"
            placeholder="Hãy chọn trạng thái thanh toán"
            allowClear
          >
            {Object.entries(StatusPay).map(([key, value]) => (
              <Option key={key} value={key}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Phí vận chuyển"
          name="shipping_fee"
          rules={[
            {
              required: true,
              message: "Phí vận chuyển không được để trống!",
            },
          ]}
          initialValue={selected?.shipping_fee}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Phương thức thanh toán"
          name="payment_method"
          initialValue={selected?.payment_method}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 23, style: { alignItems: "end" } }}>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2.5 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit"
          >
            {type === "add" ? "Thêm" : "Cập nhật"}
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormComponent;
