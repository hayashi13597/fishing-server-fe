import moment from "moment";
export function formatMoney(price: number) {
  if (isNaN(price)) {
    return price;
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export const checkImageExist = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const timeSetTing: any = {
  months: "tháng",
  month: "tháng",
  years: "năm",
  year: "năm",
  minute: "phút",
  minutes: "phút",
  day: "ngày",
  days: "ngày",
  hours: "giờ",
  hour: "giờ",
  second: "giây",
  seconds: "giây",
};
export function HandleTimeDiff(timestamp: any, timeEnd = "") {
  let result: any = !timeEnd
    ? moment(timestamp).fromNow()
    : moment(timestamp).from(timeEnd);

  if (result.includes("a few seconds ago")) return "Vài giây trước";
  if (result.includes("in a few seconds")) return "Vài giây trước";
  if (result[1] === "n") {
    result = result.replace("an", "1");
  } else if (result[0] === "a") {
    result = result.replace("a", "1");
  }

  result = result.replace("ago", "trước");
  result = result.split(" ");

  if (timeSetTing[result[1]]) {
    result[1] = timeSetTing[result[1]];
  }
  return result.join(" ");
}
