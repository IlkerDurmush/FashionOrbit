"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import CheckoutSteps from "@/components/CheckoutSteps";

const Form = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedPaymentMethod, setSelcetedPaymentMethod] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelcetedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Payment method</h1>
          <form onSubmit={handleSubmit}>
            {["PayPal", "Stripe", "Cash"].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => {
                      setSelcetedPaymentMethod(payment);
                    }}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button type="submit" className="btn btn-primary w-full">
                Next
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="btn w-full my-2"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
