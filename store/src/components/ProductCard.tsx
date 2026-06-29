import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.variants
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto pt-2">
          <p className="text-xs text-gray-500 mb-0.5">
            {product.priceFrom ? "A partir de" : ""}
          </p>
          <p className="text-base font-bold text-gray-900">
            {formatPrice(displayPrice)}
          </p>
          <button className="mt-3 w-full text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg py-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
            {product.variants ? "Seleccionar opciones" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </Link>
  );
}
