import ProductItem from "@/components/products/ProductItem";
import { Rating } from "@/components/products/Rating";
import productServices from "@/lib/services/productService";
import Link from "next/link";

const sortOrders = ["Най-нови", "Най-евтини", "Най-скъпи", "Най-оценени"];
const prices = [
  {
    name: "1лв. до 50лв.",
    value: "1-50",
  },
  {
    name: "51лв. до 200лв.",
    value: "51-200",
  },
  {
    name: "201лв. до 1000лв.",
    value: "201-1000",
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: {
    q = "Всяква",
    category = "Всяква",
    price = "Всяква",
    rating = "Всяква",
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
  if (
    (q !== "Всяква" && q !== "") ||
    category !== "Всяква" ||
    rating !== "Всяква" ||
    price !== "Всяква"
  ) {
    return {
      title: `Search ${q !== "Всяква" ? q : ""}
          ${category !== "Всяква" ? ` : Category ${category}` : ""}
          ${price !== "Всяква" ? ` : Price ${price}` : ""}
          ${rating !== "Всяква" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = "Всяква",
    category = "Всяква",
    price = "Всяква",
    rating = "Всяква",
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
    <div className="grid md:grid-cols-5 md:gap-5">
      <div>
        <div className="text-xl pt-3">Категория</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Всяква" === category && "link-primary"
                }`}
                href={getFilterUrl({ c: "Всяква" })}
              >
                Всяква
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link link-hover ${
                    c === category && "link-primary"
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl pt-3">Цена</div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Всяква" === price && "link-primary"
                }`}
                href={getFilterUrl({ p: "Всяква" })}
              >
                Всяква
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link link-hover ${
                    p.value === price && "link-primary"
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl pt-3">Мнение клиенти</div>
          <ul>
            <li>
              <Link
                href={getFilterUrl({ r: "Всяква" })}
                className={`link link-hover ${
                  "Всяква" === rating && "link-primary"
                }`}
              >
                Всяква
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link link-hover ${
                    `${r}` === rating && "link-primary"
                  }`}
                >
                  <Rating caption={" & нагоре"} value={r}></Rating>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between  py-4">
          <div className="flex items-center">
            {products.length === 0 ? "Няма" : countProducts} Резултати
            {q !== "Всяква" && q !== "" && " : " + q}
            {category !== "Всяква" && " : " + category}
            {price !== "Всяква" && " : Цена " + price}
            {rating !== "Всяква" && " : Мнения " + rating + " & нагоре"}
            &nbsp;
            {(q !== "Всяква" && q !== "") ||
            category !== "Всяква" ||
            rating !== "Всяква" ||
            price !== "Всяква" ? (
              <Link className="btn btn-sm btn-ghost" href="/search">
                Изчистване
              </Link>
            ) : null}
          </div>
          <div>
            Сортирай по{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 link link-hover ${
                  sort == s ? "link-primary" : ""
                } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className="join">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${
                    Number(page) === p + 1 ? "btn-active" : ""
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
