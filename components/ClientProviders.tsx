"use client";
import { cartStore } from "@/lib/hooks/useCartStore";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);
    return () => {
      document.removeEventListener("visibilitychange", updateStore);
      document.removeEventListener("focus", updateStore);
    };
  }, []);

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res) {
            throw new Error("An Error Has Occurred While Fetching Data");
          }
          return res.json();
        },
      }}
    >
      <Toaster />
      {children}
    </SWRConfig>
  );
}
