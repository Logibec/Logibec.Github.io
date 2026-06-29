export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "gaming" | "smartphones" | "wearables" | "audio" | "tablets";
  brand: string;
  price: number;
  priceFrom?: boolean;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  featured: boolean;
  variants?: ProductVariant[];
  tags?: string[];
  mercadoPagoLink?: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}
