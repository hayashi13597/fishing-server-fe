import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu cá Ốc Đảo | Dashboard",
  description: "Đây là trang quản lý và đăng các sản phẩm bởi quản trị viên",
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
