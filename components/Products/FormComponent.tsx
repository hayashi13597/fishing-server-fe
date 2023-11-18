import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import categories from "@/mock/categories.json";
import type { UploadProps } from "antd";
import EditorContent from "./EditorContent";
import UploadImageApi from "@/api-client/uploadfile";
import CategoriApi from "@/api-client/category";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  isEvent?: boolean;
  timeEvent?: number;
  content?: any;
  title?: string;
  id?: number;
  phone?: string;
  user_id?: number;
  address?: string;
  status?: string;
  codeBill?: string;
  shipment?: number;
  paymentMethod?: string;
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
  const [text, setText] = useState("");
  const account = useSelector((state: RootState) => state.account.account);
  const initData = {
    imageUrl: selected?.imageUrl || "",
    idPath: selected?.idPath || "",
    user_id: account.id,
    name: selected?.name || "",
    description: selected?.description || "",
    visiable: true,
  };
  const [DataSubmit, setDataSubmit] = useState(initData);

  const onFinish = (values: any) => {
    // chưa có login nên user_id default=2
    if (type == "add") {
      const { name, description, visiable = true } = values;
      console.log("DataSubmit", DataSubmit);
      if (!name || !description || !DataSubmit.imageUrl) {
        message.error("Thêm thất bại");
        return;
      }
      const dataUpload: any = {
        imageUrl: DataSubmit.imageUrl,
        idPath: DataSubmit.idPath,
        user_id: account.id,
        name,
        description,
        visiable,
      };
      CategoriApi.add(dataUpload)
        .then((res: any) => {
          setData((prev: any[]) => [...prev, res.data.category]);
          form.resetFields();
          message.success(res.message);
          closeModal && closeModal();
        })
        .catch((res) => {
          message.error(res.message);
        });
    } else {
      if (!selected?.id) {
        message.error("Thiếu id sao sửa");
      }
      const { name, description, visiable = true } = values;
      const dataUpload = {
        imageUrl: DataSubmit.imageUrl || selected.imageUrl,
        idPath: DataSubmit.idPath || selected.idPath,
        user_id: account.id,
        name,
        description,
        visiable,
      };
      if (!dataUpload.imageUrl) {
        message.success("Vui lòng nhờ ảnh upload");
      }

      CategoriApi.edit(`${selected.id}`, dataUpload)
        .then((res: any) => {
          setData((prev: any[]) => {
            if (prev?.length < 0) return prev;
            const listCate = prev.filter((item) => item.id != selected.id);
            listCate.unshift(res.data.category);
            return listCate;
          });
          form.resetFields();
          message.success(res.message);
          closeModal && closeModal();
        })
        .catch(({ message }) => {
          message.error(message);
        });
    }
  };

  const props: UploadProps = {
    name: "fileupload",
    listType: "picture",
    multiple: true,
    defaultFileList: selected && [
      {
        uid: selected?.id.toString(),
        name: selected?.name || selected?.title,
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
      const FormDataFile = new FormData();
      FormDataFile.append("file", file);

      UploadImageApi.add(FormDataFile).then((res: any) => {
        setDataSubmit((prev) => ({
          ...prev,
          idPath: res.idPath,
          imageUrl: res.imageUrl,
        }));
        message.success("Bạn có thể tạo danh mục");
      });
      return false;
    },
    onRemove() {
      if (DataSubmit.idPath) {
        UploadImageApi.delete(DataSubmit.idPath).then((res: any) => {
          console.log(res);
        });
      }
    },
    onChange({ file, fileList }) {
      if (fileList.length < 1) {
        form.setFieldValue("fileupload", null);
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
        {title === "tiêu đề" ? (
          <Form.Item<FieldType>
            label={`Tên ${title}`}
            name="title"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
            initialValue={selected?.title || ""}
          >
            <Input placeholder={`Nhập tên ${title}`} />
          </Form.Item>
        ) : title === "hóa đơn" ? (
          <></>
        ) : (
          <Form.Item<FieldType>
            label={`Tên ${title}`}
            name="name"
            rules={[{ required: true, message: "Tên không được để trống!" }]}
            initialValue={selected?.name || ""}
          >
            <Input placeholder={`Nhập tên ${title}`} />
          </Form.Item>
        )}

        {title === "hóa đơn" && (
          <>
            <Form.Item<FieldType>
              label="Mã đơn hàng"
              name="id"
              initialValue={selected?.id}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Tên khách hàng"
              name="user_id"
              initialValue={selected?.user_id}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Số điện thoại"
              name="phone"
              initialValue={selected?.phone}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Địa chỉ"
              name="address"
              initialValue={selected?.address}
            >
              <Input disabled />
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
              <Select placeholder="Hãy chọn trạng thái thanh toán" allowClear>
                <Option value={`pending`}>Chờ thanh toán</Option>
                <Option value={`canceled`}>Hủy</Option>
                <Option value={`payed`}>Đã thanh toán</Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              label="Mã bill"
              name="codeBill"
              initialValue={selected?.codeBill}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Shipment"
              name="shipment"
              initialValue={selected?.shipment}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Phương thức thanh toán"
              name="paymentMethod"
              initialValue={selected?.paymentMethod}
            >
              <Input disabled />
            </Form.Item>
          </>
        )}

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
            <Input type="number" min={0} placeholder="Giá" />
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

        {title == "tiêu đề" && (
          <Form.Item<FieldType>
            label="Loại tin"
            name="isEvent"
            initialValue={
              selected ? (selected?.isEvent === true ? true : false) : null
            }
            rules={[
              { required: true, message: "Loại tin không được để trống!" },
            ]}
          >
            <Select placeholder="Hãy chọn loại tin" allowClear>
              <Option value={true}>Sự kiện</Option>
              <Option value={false}>Tin tức</Option>
            </Select>
          </Form.Item>
        )}

        {title == "tiêu đề" && (
          <Form.Item<FieldType>
            label="Tổng ngày sự kiện"
            name="timeEvent"
            initialValue={selected?.timeEvent || 0}
            rules={[
              {
                required: true,
                message: "Tổng ngày sự kiện không được để trống!",
              },
            ]}
          >
            <Input type="number" min={0} placeholder="Nhập số ngày" />
          </Form.Item>
        )}

        {title === "tiêu đề" && (
          <Form.Item<FieldType>
            label="Nội dung"
            name="content"
            initialValue={selected?.content || text}
            rules={[
              {
                required: true,
                message: "Nội dung không được để trống!",
              },
            ]}
          >
            <EditorContent text={text} setText={setText} title="Content" />
          </Form.Item>
        )}

        {title === "hóa đơn" ? (
          <></>
        ) : (
          <>
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
              <Select placeholder="Hãy chọn trạng thái" allowClear>
                <Option value={true}>Hiện</Option>
                <Option value={false}>Ẩn</Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              label="Mô tả"
              name="description"
              initialValue={selected?.description || null}
              rules={[
                { required: true, message: "Mô tả không được để trống!" },
              ]}
            >
              <TextArea rows={4} placeholder="Nhập mô tả" />
            </Form.Item>
            <Form.Item<FieldType>
              name="imageUrl"
              label="Hình ảnh"
              rules={[
                {
                  required: DataSubmit?.imageUrl ? false : true,
                  message: "Hình ảnh không được để trống!",
                },
              ]}
            >
              <Upload {...props}>
                <Button>Chọn một hoặc nhiều hình ảnh</Button>
              </Upload>
            </Form.Item>
          </>
        )}

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
