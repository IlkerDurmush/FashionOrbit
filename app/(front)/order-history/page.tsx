import { Metadata } from "next";
import MyOrders from "./MyOrders";
export const metadata: Metadata = {
  title: "Order History",
};
export default function OrderHistory() {
  return (
    <>
      <h2 className="text-2xl py-2">Поръчки История</h2>
      <MyOrders />
    </>
  );
}
