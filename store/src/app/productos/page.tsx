import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/utils";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Productos",
  description: "Explorá todo nuestro catálogo de electrónica: smartphones, gaming, wearables, audio y tablets.",
};

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>}>
      <CatalogClient products={products} />
    </Suspense>
  );
}
