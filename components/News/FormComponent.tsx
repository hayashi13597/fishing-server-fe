import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import type { UploadProps } from "antd";

import UploadImageApi from "@/api-client/uploadfile";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NewApi from "@/api-client/new";
import moment from "moment";
import EditorContent from "@/app/san-pham/EditorContent";
import ImageContainer from "../ImageContainer";
const { Option } = Select;
const { TextArea } = Input;

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  upload?: any;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  visiable?: boolean;
  isEvent?: boolean;
  time_end?: number;
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
  setData: any;
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
  const [text, setText] = useState(selected?.content || "");
  const account = useSelector((state: RootState) => state.account.account);
  const [listImageContent, setListImageContent] = useState([]);
  const initData = {
    imageUrl: selected?.imageUrl || "",
    idPath: selected?.idPath || "",
  };
  const [DataSubmit, setDataSubmit] = useState(initData);

  const onFinish = (values: any) => {
    if (!text) {
      return message.error("Vui lòng điền nội dung");
    }
    const { title, description, visiable, isEvent, time_end } = values;
    const dataUpload: any = {
      title,
      description,
      visiable,
      isEvent,
      time_end: time_end ? new Date(time_end).toISOString() : "",
      content: text,
      imageUrl: DataSubmit.imageUrl || selected?.imageUrl,
      idPath: DataSubmit.idPath || selected?.idPath,
      user_id: account.id,
    };
    // chưa có login nên user_id default=2
    if (type == "add") {
      NewApi.Create(dataUpload)
        .then((res: any) => {
          message.success(res.message);
          setData((listNews: any[]) => [
            { User: { fullname: account.fullname }, ...res.data.event },
            ...listNews,
          ]);
          setDataSubmit(() => initData);
          closeModal && closeModal();
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
      if (!selected?.id) {
        message.error("Thiếu id sao sửa");
      }

      if (!dataUpload.imageUrl) {
        message.success("Vui lòng tải ảnh sự kiện");
        return;
      }
      dataUpload.id = selected.id;

      NewApi.Edit(dataUpload)
        .then((res: any) => {
          setData((prev: any[]) => {
            if (prev?.length < 0) return prev;
            const listnews = prev.filter((item) => item.id != selected.id);
            listnews.unshift(res.data.event);
            return listnews;
          });
          form.resetFields();
          message.success(res.message);
          closeModal && closeModal();
        })
        .catch((res) => {
          message.error(res?.message);
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
      const isJpgOrPng = file.type.includes("image");
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
      message.success("Hãy đợi xíu nhé ảnh đang tải ");
      UploadImageApi.add(FormDataFile).then((res: any) => {
        setDataSubmit((prev) => ({
          ...prev,
          idPath: res.idPath,
          imageUrl: res.imageUrl,
        }));
        message.success("Tải ảnh thành công bạn có thể tiếp tục ");
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
    onChange({ file, fileList }) {},
    action: "link",
    headers: {
      authorization: "Token",
    },
  };
  console.log(selected);
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
        <Form.Item<FieldType>
          label={`Tin tức`}
          name="title"
          rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
          initialValue={selected?.title || ""}
        >
          <Input placeholder={`Nhập Tin tức`} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Loại tin"
          name="isEvent"
          initialValue={selected?.isEvent ? true : false}
          rules={[{ required: true, message: "Loại tin không được để trống!" }]}
        >
          <Select placeholder="Hãy chọn loại tin" allowClear>
            <Option value={true}>Sự kiện</Option>
            <Option value={false}>Tin tức</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          initialValue={
            selected?.time_end
              ? moment(selected.time_end).format("YYYY-MM-DD HH:mm:ss")
              : ""
          }
          label="Thời gian sự kiện:"
          name="time_end"
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item label="Danh sách ảnh">
          <ImageContainer
            listImage={listImageContent}
            setListImage={setListImageContent}
          />
        </Form.Item>
        <Form.Item<FieldType> label="Nội dung" name="content">
          <EditorContent
            text={text || selected?.content}
            setText={setText}
            title="Content"
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Trạng thái"
          name="visiable"
          initialValue={
            selected ? (selected?.visiable === true ? true : false) : true
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
          label="Mô tả Seo"
          name="description"
          initialValue={selected?.description || null}
          rules={[{ required: true, message: "Mô tả không được để trống!" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item<FieldType>
          name="upload"
          label="Hình ảnh"
          rules={[
            {
              required: DataSubmit?.imageUrl ? false : true,
              message: "Hình ảnh không được để trống!",
            },
          ]}
        >
          <Upload {...props}>
            <Button>Chọn một hình ảnh</Button>
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
