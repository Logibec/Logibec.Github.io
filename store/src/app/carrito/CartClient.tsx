"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Zap } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

const MP_BASE_URL = process.env.NEXT_PUBLIC_MP_BASE_URL || "https://www.mercadopago.com.ar/";

export default function CartClient() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCartStore();
  const count = itemCount();
  const totalPrice = total();

  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-light text-gray-900 mb-3">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Agregá productos para comenzar tu compra</p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-gray-900">
          Mi carrito{" "}
          <span className="text-gray-400 text-xl font-normal">({count} productos)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors underline"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-200 transition-colors"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                <p className="text-blue-600 font-semibold mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1, item.variantId)
                      }
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1, item.variantId)
                      }
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 text-lg mb-5">Resumen del pedido</h2>

            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}-summary`}
                  className="flex justify-between text-gray-600"
                >
                  <span className="truncate mr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-5 pt-5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Precio en pesos argentinos</p>
            </div>

            <a
              href={MP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Pagar con Mercado Pago
            </a>

            <p className="text-xs text-gray-400 text-center mt-3">
              Serás redirigido a Mercado Pago para completar el pago de forma segura
            </p>

            <Link
              href="/productos"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
