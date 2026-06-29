import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Mi carrito",
  description: "Revisá los productos en tu carrito antes de pagar con Mercado Pago.",
};

export default function CarritoPage() {
  return <CartClient />;
}
