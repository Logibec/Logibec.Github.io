import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gamepad2, Smartphone, Watch, Headphones, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { getFeaturedProducts, formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import Logo from "@/components/Logo";

const collections = [
  {
    icon: Gamepad2,
    label: "Gaming",
    description: "Consolas y accesorios",
    href: "/productos?categoria=gaming",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Smartphone,
    label: "Smartphones",
    description: "Los mejores teléfonos",
    href: "/productos?categoria=smartphones",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Watch,
    label: "Wearables",
    description: "Relojes inteligentes",
    href: "/productos?categoria=wearables",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Headphones,
    label: "Audio",
    description: "Parlantes y auriculares",
    href: "/productos?categoria=audio",
    color: "from-rose-500 to-pink-500",
  },
];

const trustPoints = [
  {
    icon: Truck,
    title: "Envíos a todo el país",
    description: "Coordinamos el envío a cualquier punto de Argentina con seguimiento en tiempo real.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description: "Todos los pagos procesados por Mercado Pago con protección al comprador.",
  },
  {
    icon: MessageCircle,
    title: "Atención personalizada",
    description: "Respondemos todas tus consultas antes, durante y después de tu compra.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden min-h-[92vh] flex items-center justify-center">
        <div className="absolute inset-0 hero-rays opacity-60" />
        <div className="absolute inset-0">
          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <Logo size={80} />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]">
            House Of{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Everything
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Tecnología seleccionada con foco en calidad, diseño y rendimiento.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/60 text-white font-medium rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm group"
          >
            Explorar tienda
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* COLECCIONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">
            Colecciones
          </h2>
          <p className="text-gray-500 mt-2">Explorá por categoría</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col) => {
            const Icon = col.icon;
            return (
              <Link
                key={col.label}
                href={col.href}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-blue-200 bg-white hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${col.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">{col.label}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{col.description}</p>
                <div className="flex items-center gap-1 mt-3 text-blue-600 text-sm font-medium">
                  Ver más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight">
                Lo mejor de House of Everything
              </h2>
              <p className="text-gray-500 mt-1">Productos seleccionados para vos</p>
            </div>
            <Link
              href="/productos"
              className="hidden sm:flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Ver todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium"
            >
              Ver todos los productos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPRA CON CONFIANZA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">
            Compra con confianza
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="text-center group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{point.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ECOSISTEMA APPLE */}
      <AppleEcosystem />
    </>
  );
}

function AppleEcosystem() {
  const heroProduct = {
    name: "iPhone 15 Pro",
    description: "Titanio. Tan fuerte. Tan liviano. Tan Pro.",
    price: 1699000,
    slug: "samsung-galaxy-s24-ultra",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
  };

  const accessories = [
    {
      name: "Apple Watch Series 9",
      price: 899000,
      slug: "apple-watch-series-9",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    },
    {
      name: "AirPods Pro 2",
      price: 699000,
      slug: "airpods-pro-2",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80",
    },
    {
      name: "iPad Air M2",
      price: 1199000,
      slug: "ipad-air-m2",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    },
    {
      name: "Apple Watch Ultra 2",
      price: 1799000,
      slug: "apple-watch-ultra-2",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    },
  ];

  return (
    <section className="bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-400 text-sm font-medium mb-1 uppercase tracking-widest">
              Ecosistema
            </p>
            <h2 className="text-3xl font-light text-white tracking-tight">
              Apple en House Of Everything
            </h2>
          </div>
          <Link
            href="/productos?categoria=wearables"
            className="hidden sm:flex items-center gap-1.5 text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero product */}
          <Link
            href={`/productos/${heroProduct.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 p-8 flex flex-col justify-between min-h-[360px]"
          >
            <div>
              <p className="text-blue-400 text-sm font-medium mb-2">Más vendido</p>
              <h3 className="text-3xl font-light text-white mb-2">{heroProduct.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{heroProduct.description}</p>
              <p className="text-2xl font-semibold text-white">{formatPrice(heroProduct.price)}</p>
            </div>
            <div className="absolute bottom-0 right-0 w-56 h-56 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                className="object-contain object-bottom"
                sizes="240px"
              />
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:text-blue-300">
              Ver producto <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Grid de accesorios */}
          <div className="grid grid-cols-2 gap-4">
            {accessories.map((acc) => (
              <Link
                key={acc.slug}
                href={`/productos/${acc.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/60 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 p-5"
              >
                <div className="relative h-28 mb-3">
                  <Image
                    src={acc.image}
                    alt={acc.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="150px"
                  />
                </div>
                <p className="text-white text-sm font-medium line-clamp-2 leading-snug">
                  {acc.name}
                </p>
                <p className="text-blue-400 text-sm font-semibold mt-1">
                  {formatPrice(acc.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
