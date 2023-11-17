import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
const cookieClient = {
  getAll() {
    return getCookies();
  },
  set<T>(key: string, value: any, time = 0) {
    if (time) {
      setCookie(key, value, { maxAge: time });
    } else {
      setCookie(key, value);
    }
  },
  get(key: string) {
    return getCookie(key) || undefined;
  },
  remove(key: string) {
    deleteCookie(key);
  },
};
export default cookieClient;
