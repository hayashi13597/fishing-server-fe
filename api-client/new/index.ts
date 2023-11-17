import apiClient from "..";

class NewApi {
  path = "/event/";
  GetAll() {
    return apiClient.get(this.path);
  }
  GetOne(slug: string) {
    return apiClient.get(this.path + slug);
  }
  Edit(data: any) {
    return apiClient.put(this.path, {
      data,
    });
  }
  Create(data: {
    user_id: number;
    title: string;
    description: string;
    imageUrl: string;
    content: string;
    idPath: string;
    isEvent: boolean;
  }) {
    return apiClient.post(this.path, {
      data,
    });
  }
  Delete(id: string) {
    return apiClient.delete(this.path + id);
  }
}
export default new NewApi();
