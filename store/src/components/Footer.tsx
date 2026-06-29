import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo size={32} />
              <span className="text-white font-semibold text-sm">
                House Of Everything
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Tecnología seleccionada con foco en calidad, diseño y rendimiento.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/productos?categoria=smartphones", label: "Smartphones" },
                { href: "/productos?categoria=gaming", label: "Gaming" },
                { href: "/productos?categoria=wearables", label: "Wearables" },
                { href: "/productos?categoria=audio", label: "Audio" },
                { href: "/productos?categoria=tablets", label: "Tablets" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/productos" className="hover:text-white transition-colors">Todos los productos</Link></li>
              <li><Link href="/carrito" className="hover:text-white transition-colors">Mi carrito</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Compra segura</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>🔒</span> Pagos con Mercado Pago
              </li>
              <li className="flex items-center gap-2">
                <span>🚚</span> Envíos a todo el país
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span> Atención personalizada
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} House Of Everything. Todos los derechos reservados.</p>
          <p>Argentina 🇦🇷 · Precios en pesos argentinos</p>
        </div>
      </div>
    </footer>
  );
}
