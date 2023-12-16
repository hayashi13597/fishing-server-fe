import React, { useEffect, useId, useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import type { UploadProps } from "antd";

import UploadImageApi from "@/api-client/uploadfile";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProductsApi from "@/api-client/product";
import ImageContainer from "@/components/ImageContainer";
import EditorContent from "./EditorContent";
import LoadingContainer from "@/components/common/LoadingContainer";
const { Option } = Select;
const { TextArea } = Input;
interface ListImageUrl {
  uid: string;
  url: string;
  name: string;
}
type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: any;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  visiable?: boolean;
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
  saleoff?: string;
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
  const [isLoadding, setIsLoadding] = useState(false);
  const account = useSelector((state: RootState) => state.account.account);
  let listImageRender: any[] = [];

  try {
    listImageRender = JSON.parse(selected?.listSubimages || []) || [];

    listImageRender = listImageRender.map((item, index) => ({
      uid: item.idPath,
      name: " Ảnh phụ  thứ ->" + index + 1,
      url: item.imageUrl,
    }));
    listImageRender.unshift({
      uid: selected?.idPath,
      name: "Ảnh chính ",
      url: selected?.imageUrl,
    });
  } catch {}

  const [listSubImage, setListSubImage] = useState<ListImageUrl[]>(
    listImageRender || []
  );

  const Categories = useSelector((state: RootState) => state.cate.listCate);
  const onFinish = (values: any) => {
    if (!text) {
      message.error("Vui lòng điền nội dung");
    }
    const ListImageUpdate = listSubImage.slice(1).map((item) => ({
      imageUrl: item.url,
      idPath: item.uid,
    }));
    const {
      categoryId,
      description,
      name,
      price,
      saleoff,
      visiable = true,
    } = values;
    const { url = "", uid = "" } = listSubImage[0];
    if (type == "add") {
      if (listSubImage.length < 1) {
        message.error("Yêu cầu tối thiểu 1 hình ảnh");
        return;
      }

      if (!description || !name || !categoryId) {
        message.error("Vui lòng điền đầy đủ thông tin");
        return;
      }

      const DataUpload: any = {
        imageUrl: url,
        idPath: uid,
        category_id: categoryId,
        description,
        name,
        price,
        user_id: account.id,
        saleoff,
        visiable,
        listSubimages: JSON.stringify(ListImageUpdate),
        content: text,
      };
      setIsLoadding(() => true);
      ProductsApi.add(DataUpload)
        .then((res: any) => {
          message.success(res.message);
          setData((prev: any[]) => [res.data.product, ...prev]);
          setListSubImage([]);
          closeModal && closeModal();
          setText("");
        })
        .catch((res) => {
          message.error(res?.message);
        })
        .finally(() => {
          setIsLoadding(() => false);
        });
    } else {
      if (!selected?.id) {
        message.error("Không có dữ kiệu");
      }
      if (listSubImage.length < 1) {
        message.error("Yêu cầu tối thiểu 1 hình ảnh");
        return;
      }

      const dataEdit: any = {
        description,
        name,
        price,
        saleoff,
        visiable,
        category_id: categoryId,
        imageUrl: url,
        idPath: uid,
        id: selected?.id,
        content: text,
      };
      if (listSubImage.length > 0) {
        dataEdit.listSubimages = JSON.stringify(ListImageUpdate);
      }
      setIsLoadding(() => true);
      ProductsApi.edit(dataEdit)
        .then((res: any) => {
          message.success(res.message);
          setData((prev) => [
            res.data.product,
            ...prev.filter((item) => item.id != selected.id),
          ]);

          setText("");
          closeModal && closeModal();
        })
        .catch((res) => {
          message.error(res.message);
        })
        .finally(() => {
          setIsLoadding(() => false);
        });
    }
  };

  const props: UploadProps = {
    name: "fileupload",
    listType: "picture",
    multiple: true,
    defaultFileList: selected?.id ? listSubImage : [],
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
      setIsLoadding(() => true);
      UploadImageApi.add(FormDataFile)
        .then((res: any) => {
          setListSubImage((prev) => [
            ...prev,
            { name: "Ảnh Upload", uid: res.idPath, url: res.imageUrl },
          ]);
          message.success("Tải ảnh sản phẩm thành công");
        })
        .catch(() => {
          message.error("Tải ảnh  sản phẩm thất bại");
        })
        .finally(() => {
          setIsLoadding(() => false);
        });
      return false;
    },
    onRemove(file) {
      if (file && file.uid && selected?.id) {
        ProductsApi.deleteSubimage({ id: selected.id, idPath: file.uid })
          .then((res: any) => {
            message.success("Xóa ảnh thành công");
            setListSubImage((prev) =>
              prev.filter((item) => item.uid !== file.uid)
            );
          })
          .catch((res) => {
            message.error(res?.message || "Xóa thất bại");
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

        <Form.Item<FieldType>
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Giá không được để trống!" }]}
          initialValue={selected?.price || 0}
        >
          <Input type="number" min={0} placeholder="Giá" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Danh mục"
          name="categoryId"
          initialValue={selected?.Category?.id || ""}
          rules={[{ required: true, message: "Danh mục không được để trống!" }]}
        >
          <Select
            value={`Chon danh much`}
            placeholder="Hãy chọn danh mục"
            allowClear
          >
            {Categories.map((category: any) => (
              <Option value={category.id} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Giảm giá"
          name="saleoff"
          initialValue={0}
          rules={[{ required: true, message: "Giả giá không được để trống!" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            className="saleoff"
            placeholder="Hãy chọn giảm giá"
            defaultValue={0}
            options={[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90,
              100,
            ].map((item) => ({
              value: item,
              label: `${item} %`,
            }))}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          initialValue={selected?.description || null}
          rules={[{ required: true, message: "Mô tả  không được để trống!" }]}
        >
          <TextArea maxLength={255} rows={3} placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item label="Thông tin sản phảm">
          <EditorContent text={text} setText={setText} title="content" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Trạng thái"
          name="visiable"
          initialValue={selected ? selected.visiable : true}
        >
          <Select
            placeholder="Hãy chọn trạng thái"
            defaultValue={selected?.visiable || true}
            allowClear
          >
            <Option value={true}>Hiện</Option>
            <Option value={false}>Ẩn</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          name="imageUrl"
          label="Hình ảnh"
          initialValue={selected?.imageUrl || ""}
          rules={[
            {
              required: selected?.imageUrl
                ? false
                : listSubImage.length
                ? false
                : true,
              message: "Hình ảnh không được để trống!",
            },
          ]}
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
