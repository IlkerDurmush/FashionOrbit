import ProductItem from "@/components/products/ProductItem";
import { Rating } from "@/components/products/Rating";
import productServices from "@/lib/services/productService";
import Link from "next/link";

const sortOrders = ["Newest", "Cheapest", "Most expensive", "Highest Rated"];
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = "all", category = "all", price = "all", rating = "all" },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== "all" && q !== "") ||
    category !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `Search ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : Category ${category}` : ""}
          ${price !== "all" ? ` : Price ${price}` : ""}
          ${rating !== "all" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  },
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className="grid md:grid-cols-5 gap-6 p-4">
      {/* Sidebar Filters */}
      <aside className="space-y-6">
        {/* Category */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Category</h2>
          <ul className="space-y-1">
            <li>
              <Link
                className={`block px-3 py-1 rounded transition hover:bg-primary/10 ${
                  category === "all" ? "text-primary font-semibold" : ""
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={`block px-3 py-1 rounded transition hover:bg-primary/10 ${
                    category === c ? "text-primary font-semibold" : ""
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Price */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Price</h2>
          <ul className="space-y-1">
            <li>
              <Link
                className={`block px-3 py-1 rounded transition hover:bg-primary/10 ${
                  price === "all" ? "text-primary font-semibold" : ""
                }`}
                href={getFilterUrl({ p: "all" })}
              >
                All
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={`block px-3 py-1 rounded transition hover:bg-primary/10 ${
                    price === p.value ? "text-primary font-semibold" : ""
                  }`}
                  href={getFilterUrl({ p: p.value })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Rating */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <ul className="space-y-1">
            <li>
              <Link
                className={`block px-3 py-1 rounded transition hover:bg-primary/10 ${
                  rating === "all" ? "text-primary font-semibold" : ""
                }`}
                href={getFilterUrl({ r: "all" })}
              >
                All
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  className={`flex items-center gap-1 px-3 py-1 rounded transition hover:bg-primary/10 ${
                    rating === `${r}` ? "text-primary font-semibold" : ""
                  }`}
                  href={getFilterUrl({ r: `${r}` })}
                >
                  <Rating caption="& up" value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Products List */}
      <section className="md:col-span-4 space-y-6">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{products.length === 0 ? "No" : countProducts}</strong>{" "}
            Results
            {q !== "all" && q !== "" && ` : ${q}`}
            {category !== "all" && ` : ${category}`}
            {price !== "all" && ` : Price ${price}`}
            {rating !== "all" && ` : Rating ${rating} & up`}
            {(q !== "all" && q !== "") ||
            category !== "all" ||
            rating !== "all" ||
            price !== "all" ? (
              <Link className="ml-3 btn btn-sm btn-ghost" href="/search">
                Clear
              </Link>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-300">Sort by:</span>
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`btn btn-xs ${
                  sort === s ? "btn-primary" : "btn-ghost"
                } transition`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="join">
              {Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${
                    Number(page) === p + 1 ? "btn-primary" : "btn-outline"
                  }`}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
