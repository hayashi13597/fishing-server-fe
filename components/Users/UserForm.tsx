import React from "react";
import { Form, Input, Modal, Select, message } from "antd";
import UserApi from "@/api-client/user";
import NoticeApi from "@/api-client/notice";
import { Debounced } from "react-swisskit";
const { Option } = Select;

type FieldType = {
  email?: string;
  username?: string;
  fullname?: string;
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
  setData: any;
};

const UserForm = ({
  isOpen,
  closeModal,
  selected,
  setData,
}: FormComponentType) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const UserEditData = { ...values, id: selected.id };
    UserApi.Edit(UserEditData)
      .then((res: any) => {
        message.success(res.message);
        const accountedit = { ...selected, ...values };
        setData((account: any[]) => {
          return [
            accountedit,
            ...account.filter((user) => user.id != selected.id),
          ];
        });
        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };
  const handleResetPassword = () => {
    if (!selected.id) {
      message.error("Vui lòng mở lại thông tin user");
      return;
    }
    UserApi.ResetPassword(selected.id)
      .then((res: any) => {
        message.success(res.message);

        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };
  const handleDeleteNotice = () => {
    if (!selected.id) {
      message.error("Vui lòng mở lại thông tin user");
      return;
    }
    NoticeApi.DeleteOne(selected.id)
      .then((res: any) => {
        message.success(res.message);
        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err?.message);
      });
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
          label="Họ và tên"
          name="fullname"
          initialValue={selected?.fullname || null}
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Vai trò"
          name="role"
          initialValue={selected.role || "member"}
          rules={[{ required: true, message: "Vai trò không được để trống!" }]}
        >
          <Select placeholder="Hãy chọn vài trò" allowClear>
            <Option value="admin">Admin</Option>

            <Option value="member">Member</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Trạng thái"
          name="visible"
          initialValue={
            selected ? (selected?.visiable === true ? true : false) : true
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
            onClick={Debounced(handleDeleteNotice, 200)}
            className="inline-flex items-center justify-center rounded-md bg-success py-2.5 px-10 mr-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="button"
          >
            Xóa thông báo
          </button>
          <button
            onClick={Debounced(handleResetPassword, 200)}
            className="inline-flex items-center justify-center rounded-md bg-meta-1 py-2.5 px-10 mr-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="button"
          >
            Làm mới mật khẩu
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2.5 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit"
          >
            Cập nhật hồ sô
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
