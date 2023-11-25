import apiClient from "..";
const ReviewApi = {
  path: "/review/",
  GetAll(limit: number, skip: number) {
    return apiClient.get(this.path, {
      params: {
        limit: limit,
        skip,
      },
    });
  },

  DeleteReview(id) {
    return apiClient.delete(this.path + id);
  },
};
export default ReviewApi;
