import apiClient from "..";
const ProductsApi = {
  path: "/product/",

  getAll() {
    return apiClient.get(this.path + "admin");
  },
  getChart() {
    return apiClient.get(this.path + "chart");
  },
  getOne(slug: string) {
    return apiClient.get(this.path + slug);
  },
  add(data: {
    category_id: number;
    user_id: number;
    idPath: string;
    price: number;
    name: string;
    imageUrl: string;
    listSubimages: string;
    description: string;
    selloff: number;
    content: string;
  }) {
    return apiClient.post(this.path, { data });
  },
  // someFeildProduct ví dụ muốn sửa một số trường thì truyền  {description:"dsadsadsa",name:"dsadsdsa"} có trong product là dc
  edit(data: any) {
    return apiClient.put(this.path, {
      data,
    });
  },
  deleteSubimage(data: { id: string; idPath: string }) {
    return apiClient.post(this.path + "updatesubimage", { data });
  },
  delete(id: string) {
    return apiClient.delete(this.path + id);
  },
  search(search: string) {
    return apiClient.post(this.path + "search", {
      data: {
        search,
      },
    });
  },
};
export default ProductsApi;
