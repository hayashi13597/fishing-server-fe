import apiClient from "..";
const NoticeApi = {
  path: "/notice/",

  DeleteAll() {
    return apiClient.delete(this.path);
  },
  DeleteOne(id: string) {
    return apiClient.delete(this.path + id);
  },
};
export default NoticeApi;
