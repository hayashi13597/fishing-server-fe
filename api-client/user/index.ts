import apiClient from "..";

class UserApi {
  path = "/user/";
  GetAll() {
    return apiClient.get(this.path);
  }
  Edit(data: any) {
    return apiClient.patch(this.path, {
      data,
    });
  }
  ResetPassword(id: string) {
    return apiClient.post(this.path + "rerespassword", {
      data: { id },
    });
  }
  Delete(id: string) {
    return apiClient.delete(this.path + id);
  }
}
export default new UserApi();
