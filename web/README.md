# House Of Everything — Versión HTML/CSS/JS

Tienda de electrónicos 100% estática. Sin frameworks complejos, sin build step, sin costo mensual.

## Stack

| Herramienta | Rol | Tamaño |
|---|---|---|
| **Alpine.js** (CDN) | Reactividad, estado del carrito | ~15 KB |
| **CSS nativo** | Estilos, animaciones, responsive | custom |
| **Fetch API** | Cargar productos.json | nativo |
| **localStorage** | Persistencia del carrito | nativo |

## Estructura

```
web/
├── index.html          ← Home (Hero + Colecciones + Destacados + Ecosistema)
├── productos.html      ← Catálogo con filtros y ordenamiento
├── producto.html       ← Detalle de producto (vía ?slug=)
├── carrito.html        ← Carrito + checkout Mercado Pago
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   └── main.js         ← Alpine store, utilidades, componentes compartidos
└── data/
    └── products.json   ← ← ← EDITÁ ACÁ para agregar productos
```

## Desarrollo local

Para evitar problemas de CORS con `fetch('data/products.json')`, servilo con un servidor local:

```bash
# Python 3
cd web && python3 -m http.server 8080

# Node.js (npx)
cd web && npx serve .

# VSCode: instalar extensión "Live Server" y hacer click en "Go Live"
```

Abrí `http://localhost:8080` en el navegador.

## Deploy gratuito

### GitHub Pages (gratis, sin configuración)
1. Pusheá el repo a GitHub
2. Settings → Pages → Source: Deploy from a branch
3. Branch: `main` / Folder: `/web`
4. Listo — tu sitio vive en `https://tuusuario.github.io/repo/web/`

> Si el repo se llama `tuusuario.github.io`, los archivos en `/web` son accesibles directamente.

### Vercel (gratis)
1. Importá el repo en vercel.com
2. En **Root Directory** escribí `web`
3. Framework Preset: **Other**
4. Deploy → ¡listo!

### Netlify (gratis)
1. New site → Import from Git
2. Base directory: `web`
3. Sin build command ni publish directory
4. Deploy

## Agregar productos

Editá `data/products.json`. Cada producto:

```json
{
  "id": "16",
  "slug": "mi-producto",
  "name": "Nombre del Producto",
  "category": "smartphones",
  "brand": "Marca",
  "price": 499000,
  "priceFrom": false,
  "images": ["https://url-de-imagen.jpg"],
  "rating": 4.5,
  "reviewCount": 100,
  "description": "Descripción...",
  "featured": false,
  "variants": [
    { "id": "v1", "name": "128 GB", "price": 499000, "stock": 5 }
  ],
  "mercadoPagoLink": "https://mpago.la/tu-link"
}
```

## Configurar Mercado Pago

1. Entrá a [mercadopago.com.ar/cobros](https://www.mercadopago.com.ar/cobros)
2. Creá un link de pago
3. En `data/products.json`, agregá `"mercadoPagoLink": "https://mpago.la/XXXX"` a cada producto
4. O editá la URL por defecto en `carrito.html` (buscar `mpLink`)

Solo pagás comisión (~5.99% + IVA) cuando se concreta una venta. Sin suscripción.
