"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import useSWR from "swr";

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`);
  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div>
      <h1 className="py-4 text-2xl">Поръчки</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ПОТРЕБИТЕЛ</th>
              <th>ДАТА</th>
              <th>ОБЩО</th>
              <th>ПЛАТИЛ</th>
              <th>ДОСТАВЕН</th>
              <th>ДЕЙСТВИЕ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>..{order._id.substring(20, 24)}</td>
                <td>{order.user?.name || "Потребител"}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}лв.</td>
                <td>
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "Неплатено"}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : "Недоставен"}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Детайли
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
