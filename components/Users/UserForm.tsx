import React from "react";
import { Form, Input, Modal, Select, message } from "antd";

const { Option } = Select;

type FieldType = {
  email?: string;
  username?: string;
  fullName?: string;
  avatar?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  visible?: boolean;
};

type FormComponentType = {
  isOpen?: boolean;
  closeModal?: () => void;
  selected?: any;
};

const UserForm = ({ isOpen, closeModal, selected }: FormComponentType) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.createdAt = new Date();
    values.updatedAt = new Date();
    console.log(values);
    message.success(`Cập nhật tài khoản thành công`);
  };

  return (
    <Modal
      title={`Sửa tài khoản`}
      open={isOpen}
      onCancel={closeModal}
      width={800}
      footer={<></>}
    >
      <Form
        name="formComponent"
        form={form}
        labelCol={{ span: 4, style: { textAlign: "left" } }}
        wrapperCol={{ span: 19 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        className="mt-5"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email không được để trống!" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
          initialValue={selected?.email || ""}
        >
          <Input placeholder="Nhập email" disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          initialValue={selected?.username || ""}
          rules={[
            {
              required: true,
              message: "Uername không được để trống!",
            },
          ]}
        >
          <Input placeholder="Nhập username" disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Họ và tên"
          name="fullName"
          initialValue={selected?.fullName || null}
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Vai trò"
          name="role"
          initialValue={
            selected?.role === "admin"
              ? "admin"
              : selected?.role === "manager"
              ? "manager"
              : "member"
          }
          rules={[{ required: true, message: "Vai trò không được để trống!" }]}
        >
          <Select placeholder="Hãy chọn vài trò" allowClear>
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
            <Option value="member">Member</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Trạng thái"
          name="visible"
          initialValue={
            selected ? (selected?.visible === true ? true : false) : null
          }
          rules={[
            { required: true, message: "Trạng thái không được để trống!" },
          ]}
        >
          <Select placeholder="Hãy chọn trạn thái" allowClear>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Khóa</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 23, style: { alignItems: "end" } }}>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2.5 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
