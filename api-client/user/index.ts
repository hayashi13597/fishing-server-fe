import apiClient from "..";

class UserApi {
  path = "/user/";
  login(data: { email: string; password: string }) {
    return apiClient.post(this.path + "adminlogin", {
      data,
    });
  }
  loginFast() {
    return apiClient.post(this.path + "adminloginfast");
  }
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
  Dashboard() {
    return apiClient.get(this.path + "dashboard");
  }
}
export default new UserApi();
