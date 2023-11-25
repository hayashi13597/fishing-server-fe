import moment from "moment";
export function formatMoney(price: number) {
  if (isNaN(price)) {
    return price;
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
}
export function formatNumber(quantity: number) {
  if (quantity >= 1000) return `${quantity / 1000} +K`;
  else if (quantity >= 1000000) return `${(quantity / 1000000).toFixed(1)} M`;
  else if (quantity >= 1000000000)
    return `${(quantity / 1000000000).toFixed(1)} B`;
  return quantity;
}
export function formatDateTime(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
export function isTimeEnd(timecreate: string) {
  return new Date(timecreate).getTime() - new Date(Date.now()).getTime() > 0;
}
export function RenderExpired(timeExprice: string) {
  if (isTimeEnd(timeExprice)) {
    return `Còn ${HandleTimeDiff(timeExprice)}`;
  } else {
    return "Hết hạn";
  }
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
  in: "",
  a: "một",
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
  result = result.map((item) => {
    if (timeSetTing[item]) {
      return timeSetTing[item];
    } else {
      return item;
    }
  });

  return result.join(" ");
}
