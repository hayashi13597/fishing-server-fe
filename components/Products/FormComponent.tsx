import React from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import categories from "@/mock/categories.json";
import type { UploadProps } from "antd";

const { Option } = Select;
const { TextArea } = Input;

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: any;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  visible?: boolean;
};

type FormComponentType = {
  title?: string;
  type?: string;
  isOpen?: boolean;
  closeModal?: () => void;
  selected?: any;
};

const FormComponent = ({
  title,
  type,
  isOpen,
  closeModal,
  selected,
}: FormComponentType) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.createdAt = new Date();
    values.updatedAt = new Date();
    console.log(values);
    message.success(`${type === "add" ? "Thêm" : "Cập nhật"} thành công`);
  };

  const props: UploadProps = {
    name: "imageUrl",
    listType: "picture",
    multiple: true,
    defaultFileList: selected && [
      {
        uid: selected?.id.toString(),
        name: selected?.name,
        url: selected?.imageUrl,
      },
    ],
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Bạn chỉ có thể tải định dạng JPG/PNG!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(`${file.name} lớn hơn 2MB!`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onRemove(file) {
      console.log(file);
    },
    onChange({ file, fileList }) {
      console.log(file);
      if (fileList.length < 1) {
        form.setFieldValue("imageUrl", null);
      }
    },
    action: "link",
    headers: {
      authorization: "Token",
    },
  };

  return (
    <Modal
      title={`${type === "add" ? "Thêm" : "Sửa"} ${title}`}
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
          label={`Tên ${title}`}
          name="name"
          rules={[{ required: true, message: "Tên không được để trống!" }]}
          initialValue={selected?.name || ""}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        {title === "sản phẩm" && (
          <Form.Item<FieldType>
            label="Giá"
            name="price"
            initialValue={selected?.price || ""}
            rules={[
              {
                required: true,
                message: "Giá không được để trống!",
              },
            ]}
          >
            <Input type="number" placeholder="Giá" />
          </Form.Item>
        )}

        {title === "sản phẩm" && (
          <Form.Item<FieldType>
            label="Danh mục"
            name="categoryId"
            initialValue={selected?.categoryId || null}
            rules={[
              { required: true, message: "Danh mục không được để trống!" },
            ]}
          >
            <Select placeholder="Hãy chọn danh mục" allowClear>
              {categories?.map((category) => (
                <Option value={category.id} key={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
            <Option value={true}>Hiện</Option>
            <Option value={false}>Ẩn</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          initialValue={selected?.description || null}
          rules={[{ required: true, message: "Mô tả không được để trống!" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item<FieldType>
          name="imageUrl"
          label="Hình ảnh"
          rules={[{ required: true, message: "Hình ảnh không được để trống!" }]}
        >
          <Upload {...props}>
            <Button>Chọn một hoặc nhiều hình ảnh</Button>
          </Upload>
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
