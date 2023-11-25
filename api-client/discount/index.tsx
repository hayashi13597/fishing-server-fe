import apiClient from "..";
const DiscountApi = {
  path: "/discount/",

  GetAll(limit: number, skip: number) {
    return apiClient.get(this.path, {
      params: {
        limit: limit,
        skip,
      },
    });
  },
  CreateDiscount(value: string, user_id: string, expirydate: string) {
    return apiClient.post(this.path, {
      data: {
        value,
        user_id,
        expirydate,
      },
    });
  },
  DeleteDiscount(id: number) {
    return apiClient.delete(this.path + id);
  },
};
export default DiscountApi;
