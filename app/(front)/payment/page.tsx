import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Payment Method",
};

export default async function PaymentPafe() {
  return <Form />;
}
