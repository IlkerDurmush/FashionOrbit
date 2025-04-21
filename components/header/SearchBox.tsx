"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "Всяква";

  const { data: categories, error } = useSWR("/api/products/categories");

  if (error) return error.message;
  if (!categories) return "Loading...";

  return (
    <form action="/search" method="GET">
      <div className="join">
        <input
          className="join-item input input-bordered  w-68"
          placeholder="Looking for?"
          defaultValue={q}
          name="q"
        />
        <button className="join-item btn">Search</button>
      </div>
    </form>
  );
};
