import apiClient from "..";
const ProductsApi = {
  path: "/product/",

  getAll() {
    return apiClient.get(this.path);
  },
  getOne(slug: string) {
    return apiClient.get(this.path + slug);
  },
  add(data: {
    user_id: string;
    category_id: string;
    price?: number;
    name: string;
    desctiption: string;
    seffoff: 0;
  }) {
    return apiClient.get(this.path, { data });
  },
  // someFeildProduct ví dụ muốn sửa một số trường thì truyền  {description:"dsadsadsa",name:"dsadsdsa"} có trong product là dc
  edit(data: { id: string; someFeildProduct: any }) {
    return apiClient.put(this.path, {
      data: {
        id: data.id,
        ...data.someFeildProduct,
      },
    });
  },
  delete(id: string) {
    return apiClient.delete(this.path + id);
  },
};
export default ProductsApi;
