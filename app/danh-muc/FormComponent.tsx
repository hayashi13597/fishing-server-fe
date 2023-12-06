import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import categories from "@/mock/categories.json";
import type { UploadProps } from "antd";
import UploadImageApi from "@/api-client/uploadfile";
import CategoriApi from "@/api-client/category";
import EditorContent from "@/components/Products/EditorContent";
import { useDispatch, useSelector } from "react-redux";
import { UploadCategory } from "@/redux/category/CategorySlicer";
import { RootState } from "@/redux/store";
import Loader from "@/components/common/Loader";
import LoadingContainer from "@/components/common/LoadingContainer";
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
  const [text, setText] = useState("");
  const account = useSelector((state: RootState) => state.account.account);
  const [isLoadding, setIsLoadding] = useState(false);
  const initData = {
    imageUrl: selected?.imageUrl || "",
    idPath: selected?.idPath || "",
    user_id: account.id,
    name: selected?.name || "",
    description: selected?.description || "",
    visiable: true,
  };
  const [DataSubmit, setDataSubmit] = useState(initData);
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    // chưa có login nên user_id default=2
    if (type == "add") {
      const { name, description, visiable = true } = values;
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
      setIsLoadding(() => true);
      CategoriApi.add(dataUpload)
        .then((res: any) => {
          setData((prev: any[]) => {
            const newListCates = [...prev, res.data.category];
            dispatch(UploadCategory(newListCates));

            return newListCates;
          });
          form.resetFields();
          message.success(res.message);

          closeModal && closeModal();
        })
        .catch((res) => {
          message.error(res.message);
        })
        .finally(() => {
          setIsLoadding(() => false);
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
      setIsLoadding(() => true);
      CategoriApi.edit(`${selected.id}`, dataUpload)
        .then((res: any) => {
          setData((prev: any[]) => {
            if (prev?.length < 0) return prev;
            const listCate = prev.filter((item) => item.id != selected.id);
            listCate.unshift(res.data.category);
            dispatch(UploadCategory(listCate));
            return listCate;
          });
          form.resetFields();
          message.success(res.message);
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
    multiple: false,
    defaultFileList: selected && [
      {
        uid: selected?.id?.toString(),
        name: selected?.name || selected?.title,
        url: selected?.imageUrl,
      },
    ],
    beforeUpload(file) {
      setIsLoadding(() => true);
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

      UploadImageApi.add(FormDataFile)
        .then((res: any) => {
          setDataSubmit((prev) => ({
            ...prev,
            idPath: res.idPath,
            imageUrl: res.imageUrl,
          }));
          message.success("Tải ảnh thành công");
        })
        .finally(() => {
          setIsLoadding(() => false);
        });
      return false;
    },
    onRemove() {
      if (DataSubmit.idPath) {
        UploadImageApi.delete(DataSubmit.idPath).then((res: any) => {
          message.success("Xóa ảnh thành công");
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

        {title === "sản phẩm" && (
          <Form.Item<FieldType>
            label="Danh mục"
            name="categoryId"
            className="capitalize"
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
            <EditorContent
              key={selected?.id || "asdsad"}
              text={text}
              setText={setText}
              title="Content"
            />
          </Form.Item>
        )}

        {title === "hóa đơn" ? (
          <></>
        ) : (
          <>
            <Form.Item<FieldType>
              label="Trạng thái"
              name="visiable"
              initialValue={selected?.visiable || false}
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
                <Button>Chọn một hình ảnh</Button>
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
