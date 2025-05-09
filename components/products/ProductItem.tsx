import { Product } from "@/lib/models/ProductModel";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure className="mt-3">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-64 w-full rounded-lg hover:opacity-80"
          ></Image>
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title font-normal">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">{product.price}$</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
