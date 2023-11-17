import apiClient from "..";
const CategoriApi = {
  path: "/cate/",

  getAll() {
    return apiClient.get(this.path);
  },
  getOne(id: string) {
    return apiClient.get(this.path + id);
  },
  add(data: {
    user_id: string;
    category_id: string;
    name: string;
    desctiption: string;
    visiable: boolean;
    seffoff: 0;
  }) {
    return apiClient.post(this.path, { data });
  },
  edit(id: string, someFeildCate: any) {
    return apiClient.put(this.path, {
      data: {
        id,
        ...someFeildCate,
      },
    });
  },
  delete(id: string) {
    return apiClient.delete(this.path + id);
  },
};
export default CategoriApi;
