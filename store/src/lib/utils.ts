import { type ClassValue, clsx } from "clsx";
import productsData from "./products.json";
import type { Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const products: Product[] = productsData as Product[];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function buildMercadoPagoLink(
  title: string,
  price: number,
  quantity: number = 1
): string {
  const baseUrl = process.env.NEXT_PUBLIC_MP_BASE_URL || "https://mpago.la/";
  return baseUrl;
}

export const categoryMeta: Record<
  string,
  { label: string; description: string }
> = {
  gaming: { label: "Gaming", description: "Consolas y accesorios" },
  smartphones: { label: "Smartphones", description: "Los mejores teléfonos" },
  wearables: { label: "Wearables", description: "Relojes inteligentes" },
  audio: { label: "Audio", description: "Parlantes y auriculares" },
  tablets: { label: "Tablets", description: "Tablets y e-readers" },
};
