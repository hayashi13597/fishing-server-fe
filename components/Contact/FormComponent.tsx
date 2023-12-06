import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";

import EditorContent from "../Products/EditorContent";
import ContactApi from "@/api-client/contact";

type FieldType = {
  id: number;
  fullname: string;
  email: string;
  content: string;
  phone: string;
  title: string;
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

const FormComponent = ({ isOpen, closeModal, selected }: FormComponentType) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  console.log(content);
  const onFinish = (values) => {
    console.log(values);

    if (!content) {
      return message.error("Nội dung liên hệ không được để trống");
    }
    ContactApi.ReplyContact(values.email, values.title, content, selected.id)
      .then((res: any) => {
        message.success(res.message);
        setContent(() => "");
        closeModal && closeModal();
      })
      .catch((err) => {
        message.error(err.message || "Trả lời liên hệ thất bại");
      });
  };

  return (
    <Modal
      title={`Trả lời nội dung`}
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email không được để trống!" }]}
          initialValue={selected.email}
        >
          <Input type="email" placeholder="Email" disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Họ và tên"
          name="fullname"
          rules={[
            { required: true, message: "Họ và tên không được để trống!" },
          ]}
          initialValue={selected.fullname}
        >
          <Input type="text" disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Số điện thoại không được để trống!" },
          ]}
          initialValue={selected.phone}
        >
          <Input type="text" disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Nội dung không được để trống!" }]}
          initialValue={selected.content}
        >
          <Input type="text" disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
          initialValue={"Trả lời liên hệ"}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Trả lời liên hệ">
          <EditorContent text={content} setText={setContent} title="content" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 23, style: { alignItems: "end" } }}>
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary py-2.5 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            type="submit"
          >
            Trả lời khách hàng
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormComponent;
