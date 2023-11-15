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
