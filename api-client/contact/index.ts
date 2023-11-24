import apiClient from "..";
const ContactApi = {
  path: "/contact/",

  GetAll(limit: number, skip: number) {
    return apiClient.get(this.path, {
      params: {
        limit: limit,
        skip,
      },
    });
  },
  ReplyContact(email: string, title: string, content: string, id: number) {
    return apiClient.post(this.path + "contact", {
      data: {
        email,
        title,
        content,
        id,
      },
    });
  },
  DeleteContact(id) {
    return apiClient.delete(this.path + id);
  },
};
export default ContactApi;
