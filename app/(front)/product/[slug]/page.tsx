import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import Mike from "../../../../public/images/Mike.png";
import AddToCart from "@/components/products/AddToCart";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { Rating } from "@/components/products/Rating";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center space-y-4">
        <Image src={Mike} alt="Mike" className="w-36 h-36" />
        <p className="text-xl font-semibold text-red-500">
          Whoops, that item doesn't exist!
        </p>
        <Link href="/" className="btn btn-outline btn-accent rounded-xl px-6">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 py-2">
        <Link
          href="/"
          className="btn btn-outline btn-secondary rounded-xl px-4 py-2"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Image */}
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="rounded-2xl shadow-md w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Rating
            value={product.rating}
            caption={`${product.numReviews} reviews`}
          />
          <p className="text-gray-500 text-lg font-medium">
            Brand: {product.brand}
          </p>
          <div className="divider" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Description:</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Purchase Card */}
        <div>
          <div className="card bg-base-200 shadow-xl rounded-2xl">
            <div className="card-body space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Price:</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Status:</span>
                <span
                  className={
                    product.countInStock > 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </span>
              </div>
              {product.countInStock > 0 && (
                <div className="pt-4">
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: "",
                      size: "",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
