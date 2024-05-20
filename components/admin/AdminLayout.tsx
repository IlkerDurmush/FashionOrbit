import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const AdminLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Неавторизиран</h1>
          <p>Нужни за админски права</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-grow">
      <div className="w-full grid md:grid-cols-5">
        <div className="bg-base-200">
          <ul className="menu">
            <li>
              <Link
                className={"dashboard" === activeItem ? "active" : ""}
                href="/admin/dashboard"
              >
                Табло
              </Link>
            </li>
            <li>
              <Link
                className={"orders" === activeItem ? "active" : ""}
                href="/admin/orders"
              >
                Поръчки
              </Link>
            </li>
            <li>
              <Link
                className={"products" === activeItem ? "active" : ""}
                href="/admin/products"
              >
                Продукти
              </Link>
            </li>
            <li>
              <Link
                className={"users" === activeItem ? "active" : ""}
                href="/admin/users"
              >
                Потребители
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children} </div>
      </div>
    </div>
  );
};

export default AdminLayout;
