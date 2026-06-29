"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Zap, Shield, Truck } from "lucide-react";
import type { Product, ProductVariant } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import StarRating from "@/components/StarRating";

const MP_BASE_URL = process.env.NEXT_PUBLIC_MP_BASE_URL || "#";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants ? product.variants[0] : null
  );
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const price = selectedVariant ? selectedVariant.price : product.price;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      quantity: 1,
      name: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
      price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const mpLink = product.mercadoPagoLink || MP_BASE_URL;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-blue-600 transition-colors">Productos</Link>
        <span>/</span>
        <Link
          href={`/productos?categoria=${product.category}`}
          className="hover:text-blue-600 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl font-light text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>

          <div className="border-t border-b border-gray-100 py-5">
            {product.priceFrom && (
              <p className="text-xs text-gray-500 mb-1">A partir de</p>
            )}
            <p className="text-4xl font-semibold text-gray-900">{formatPrice(price)}</p>
            <p className="text-sm text-gray-500 mt-1">Precio en pesos argentinos</p>
          </div>

          {/* Variantes */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Variante:{" "}
                <span className="font-normal text-gray-600">{selectedVariant?.name}</span>
              </p>
              <div className="flex flex-col gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span>{variant.name}</span>
                    <span className="font-semibold">{formatPrice(variant.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {added ? "¡Agregado al carrito!" : "Agregar al carrito"}
            </button>

            <a
              href={mpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Zap className="w-4 h-4" />
              Comprar ahora con Mercado Pago
            </a>
          </div>

          {/* Beneficios */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {[
              { icon: Truck, text: "Envío a todo el país" },
              { icon: Shield, text: "Compra protegida por Mercado Pago" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {/* Descripción */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
