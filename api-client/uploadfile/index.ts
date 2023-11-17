import apiClient from "..";

const UploadImageApi = {
  path: "/upload/",

  add(data: FormData) {
    return apiClient({
      url: this.path,
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete(idPath: string) {
    return apiClient.delete(this.path + idPath);
  },
};
export default UploadImageApi;
