import apiClient from "..";
const OrderApi = {
  path: "/order/",

  GetAll(limit: number, skip: number) {
    return apiClient.get(this.path, {
      params: {
        limit: limit,
        skip,
      },
    });
  },
  GetDetail(order_id: number) {
    return apiClient.post(this.path, {
      data: {
        order_id,
      },
    });
  },
  EditOrder(id, dataUpdate) {
    return apiClient.patch(this.path, {
      data: {
        id,
        ...dataUpdate,
      },
    });
  },
  DeleteOrder(id) {
    return apiClient.delete(this.path + id);
  },
  DeleteOrderDetail(id) {
    return apiClient.delete(this.path + "detail/" + id);
  },
  Search(search: string) {
    return apiClient.post(this.path + "search", {
      data: {
        search,
      },
    });
  },
};
export default OrderApi;
