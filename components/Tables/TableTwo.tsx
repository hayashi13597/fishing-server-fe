import { formatMoney, formatNumber } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const TableTwo = ({
  title,
  data,
  link,
  isShow = true,
}: {
  title?: string;
  data?: any[];
  sortType?: string;
  link: string;
  isShow?: boolean;
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {isShow && (
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title || "Top Products"}
          </h4>
          <Link href={`${link}`} className="hover:text-primary">
            Xem tất cả
          </Link>
        </div>
      )}

      <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Tên sản phẩm</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Lượt xem</p>
        </div>
        <div className="col-span-1 flex items-center justify-center md:justify-start">
          <p className="font-medium">Giá</p>
        </div>
        <div className="col-span-1 flex items-center justify-center md:justify-start">
          <p className="font-medium">Đã bán</p>
        </div>
      </div>

      {data.map((item, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-4 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md hidden md:block">
                <Image
                  src={item.imageUrl}
                  width={60}
                  height={50}
                  alt={item.name}
                />
              </div>
              <p className="text-sm text-black whitespace-break-spaces dark:text-white">
                {item.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {formatNumber(item.view)}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center md:justify-start">
            <p className="text-sm text-black dark:text-white">
              {formatMoney(item.price)}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center md:justify-start">
            <p className="text-sm text-black dark:text-white">{item.sales}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
