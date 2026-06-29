# House Of Everything — Tienda Online

Tienda de electrónicos para Argentina construida con Next.js 14, Tailwind CSS y Mercado Pago. Sin suscripciones, desplegable gratis en Vercel.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** para estilos
- **Zustand** para el carrito (persiste en localStorage)
- **Mercado Pago** via links de pago (sin API key, solo comisión por transacción)
- **Vercel** para deploy gratuito

## Desarrollo local

```bash
cd store
npm install
cp .env.example .env.local
# Editá .env.local con tus valores
npm run dev
```

La app estará en `http://localhost:3000`.

## Agregar productos

Editá `src/lib/products.json`. Cada producto sigue esta estructura:

```json
{
  "id": "16",
  "slug": "mi-producto",          // URL del producto
  "name": "Nombre del Producto",
  "category": "smartphones",      // gaming | smartphones | wearables | audio | tablets
  "brand": "Marca",
  "price": 499000,                // precio en ARS sin puntos
  "priceFrom": false,             // true si tiene variantes con distintos precios
  "images": ["https://..."],      // mínimo 1, hasta 6
  "rating": 4.5,
  "reviewCount": 100,
  "description": "Descripción del producto",
  "featured": false,              // true = aparece en la home
  "variants": [                   // opcional
    { "id": "v1", "name": "128 GB", "price": 499000, "stock": 5 }
  ]
}
```

## Deploy en Vercel (gratis)

1. **Fork** este repo en tu cuenta de GitHub
2. Ingresá a [vercel.com](https://vercel.com) → **Add New Project**
3. Importá tu repositorio de GitHub
4. En **Root Directory** escribí `store`
5. En **Environment Variables** agregá:
   - `NEXT_PUBLIC_SITE_URL` → tu dominio de Vercel (ej. `https://houseofeverything.vercel.app`)
   - `NEXT_PUBLIC_MP_BASE_URL` → tu link de Mercado Pago (ver abajo)
6. Click en **Deploy** → ¡listo!

### Dominio personalizado
En Vercel → Settings → Domains → agregá tu dominio (ej. `houseofeverything.com.ar`).

## Configurar Mercado Pago

**Sin costo mensual** — solo pagás comisión cuando vendés (~5.99% + IVA para pagos con tarjeta).

### Opción 1: Link de pago único (más simple)
1. Entrá a [mercadopago.com.ar/cobros](https://www.mercadopago.com.ar/cobros)
2. Creá un link de pago genérico (ej. "House Of Everything")
3. Copiá el link (formato `https://mpago.la/XXXXXXXXX`)
4. Pegalo en `NEXT_PUBLIC_MP_BASE_URL` en Vercel

El comprador indica el producto en los comentarios del pago. Ideal para empezar.

### Opción 2: Link por producto (recomendado)
1. Para cada producto, creá un link de pago individual en Mercado Pago
2. En `products.json`, agregá el campo `"mercadoPagoLink": "https://mpago.la/XXXXXXXXX"` a cada producto

### Opción 3: Checkout Pro (avanzado)
Requiere API key y backend. Documentación: [developers.mercadopago.com](https://developers.mercadopago.com/es/docs/checkout-pro/landing)

## Estructura del proyecto

```
store/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home
│   │   ├── layout.tsx            # Layout global
│   │   ├── sitemap.ts            # Sitemap automático
│   │   ├── productos/
│   │   │   ├── page.tsx          # Catálogo
│   │   │   ├── CatalogClient.tsx # Filtros y ordenamiento
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── ProductDetail.tsx
│   │   └── carrito/
│   │       ├── page.tsx
│   │       └── CartClient.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── ProductCard.tsx
│   │   └── StarRating.tsx
│   ├── lib/
│   │   ├── products.json         # ← editá acá para agregar productos
│   │   ├── utils.ts
│   │   └── cart-store.ts         # Zustand store
│   └── types/
│       └── index.ts
├── public/
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```
