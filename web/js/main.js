/* ─── Utilidades ─────────────────────────────────────────────── */

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);
}

function renderStars(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += `<svg class="${i <= Math.round(rating) ? 'star-fill' : 'star-empty'}"
      width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
    </svg>`;
  }
  html += '</div>';
  return html;
}

/* Logo SVG inline */
function logoSVG(size = 36) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="url(#lg${size})"/>
    <path d="M20 10L9 19.5H12V30H18V24H22V30H28V19.5H31L20 10Z"
      fill="white" fill-opacity=".15" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="20" cy="22" r="4.5" stroke="white" stroke-width="1.8" fill="none"/>
    <path d="M20 17.5V19.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
    <defs>
      <linearGradient id="lg${size}" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1d4ed8"/><stop offset="1" stop-color="#3b82f6"/>
      </linearGradient>
    </defs>
  </svg>`;
}

/* ─── Alpine Store (carrito) ─────────────────────────────────── */
document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    items: JSON.parse(localStorage.getItem('hoe-cart') || '[]'),

    save() { localStorage.setItem('hoe-cart', JSON.stringify(this.items)); },

    get count() { return this.items.reduce((s, i) => s + i.quantity, 0); },

    get total() { return this.items.reduce((s, i) => s + i.price * i.quantity, 0); },

    add(item) {
      const existing = this.items.find(
        i => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        this.items.push({ ...item });
      }
      this.save();
    },

    remove(productId, variantId) {
      this.items = this.items.filter(
        i => !(i.productId === productId && i.variantId === variantId)
      );
      this.save();
    },

    updateQty(productId, qty, variantId) {
      if (qty <= 0) { this.remove(productId, variantId); return; }
      const item = this.items.find(i => i.productId === productId && i.variantId === variantId);
      if (item) { item.quantity = qty; this.save(); }
    },

    clear() { this.items = []; this.save(); },
  });
});

/* ─── Header compartido ──────────────────────────────────────── */
function renderHeader(activePage = '') {
  const nav = [
    { href: 'productos.html', label: 'Productos' },
    { href: 'productos.html?categoria=gaming', label: 'Gaming' },
    { href: 'productos.html?categoria=smartphones', label: 'Smartphones' },
    { href: 'productos.html?categoria=wearables', label: 'Wearables' },
    { href: 'productos.html?categoria=audio', label: 'Audio' },
  ];
  const links = nav.map(l =>
    `<a href="${l.href}" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">${l.label}</a>`
  ).join('');

  return `
  <header class="site-header" x-data x-init="
    window.addEventListener('scroll', () => {
      $el.classList.toggle('scrolled', window.scrollY > 20);
    })
  ">
    <div class="container">
      <div style="display:flex;align-items:center;justify-content:space-between;height:4rem;">
        <a href="index.html" style="display:flex;align-items:center;gap:.625rem;text-decoration:none;">
          ${logoSVG(36)}
          <span style="font-weight:600;font-size:.875rem;color:#111827;display:none;" class="sm-show">House Of Everything</span>
        </a>

        <nav class="nav-links">${links}</nav>

        <div style="display:flex;align-items:center;gap:.75rem;">
          <a href="carrito.html" style="position:relative;padding:.5rem;color:#374151;text-decoration:none;"
            aria-label="Carrito">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span class="badge-count" x-show="$store.cart.count > 0" x-text="$store.cart.count > 9 ? '9+' : $store.cart.count"></span>
          </a>
          <button onclick="document.getElementById('mobile-menu').classList.toggle('open')"
            style="padding:.5rem;border:none;background:none;cursor:pointer;color:#374151;" class="mobile-toggle">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="mobile-menu" style="border-top:1px solid #f3f4f6;padding:.75rem 1rem 1rem;">
      <nav style="display:flex;flex-direction:column;gap:.25rem;">
        ${nav.map(l => `<a href="${l.href}" style="font-size:.875rem;font-weight:500;color:#374151;padding:.5rem 0;text-decoration:none;">${l.label}</a>`).join('')}
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer" style="margin-top:4rem;">
    <div class="container" style="padding-top:3rem;padding-bottom:3rem;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:2rem;">
        <div>
          <a href="index.html" style="display:flex;align-items:center;gap:.5rem;text-decoration:none;margin-bottom:1rem;">
            ${logoSVG(32)}
            <span style="color:#fff;font-weight:600;font-size:.875rem;">House Of Everything</span>
          </a>
          <p style="font-size:.875rem;line-height:1.6;">Tecnología seleccionada con foco en calidad, diseño y rendimiento.</p>
        </div>
        <div>
          <h3 style="color:#fff;font-weight:600;font-size:.875rem;margin-bottom:1rem;">Categorías</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
            ${['smartphones','gaming','wearables','audio','tablets'].map(c =>
              `<li><a href="productos.html?categoria=${c}" style="font-size:.875rem;color:#9ca3af;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">${c.charAt(0).toUpperCase()+c.slice(1)}</a></li>`
            ).join('')}
          </ul>
        </div>
        <div>
          <h3 style="color:#fff;font-weight:600;font-size:.875rem;margin-bottom:1rem;">Tienda</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
            <li><a href="productos.html" style="font-size:.875rem;color:#9ca3af;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">Todos los productos</a></li>
            <li><a href="carrito.html" style="font-size:.875rem;color:#9ca3af;text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#9ca3af'">Mi carrito</a></li>
          </ul>
        </div>
        <div>
          <h3 style="color:#fff;font-weight:600;font-size:.875rem;margin-bottom:1rem;">Compra segura</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.625rem;font-size:.875rem;">
            <li>🔒 Pagos con Mercado Pago</li>
            <li>🚚 Envíos a todo el país</li>
            <li>💬 Atención personalizada</li>
          </ul>
        </div>
      </div>
      <div style="border-top:1px solid #1f2937;margin-top:2.5rem;padding-top:1.5rem;display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;font-size:.75rem;">
        <p>© ${new Date().getFullYear()} House Of Everything. Todos los derechos reservados.</p>
        <p>Argentina 🇦🇷 · Precios en pesos argentinos</p>
      </div>
    </div>
  </footer>`;
}

/* ─── Product card HTML ──────────────────────────────────────── */
function productCardHTML(p) {
  const price = p.variants ? Math.min(...p.variants.map(v => v.price)) : p.price;
  const btnLabel = p.variants ? 'Seleccionar opciones' : 'Agregar al carrito';
  return `
  <a href="producto.html?slug=${p.slug}" class="product-card">
    <div class="card-img">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
    </div>
    <div style="padding:1rem;display:flex;flex-direction:column;gap:.5rem;flex:1;">
      <p style="font-size:.75rem;color:#2563eb;font-weight:500;text-transform:uppercase;letter-spacing:.05em;">${p.brand}</p>
      <h3 style="font-size:.875rem;font-weight:600;color:#111827;line-height:1.35;" class="clamp-2">${p.name}</h3>
      <div style="display:flex;align-items:center;gap:.375rem;">
        ${renderStars(p.rating)}
        <span style="font-size:.75rem;color:#6b7280;font-weight:500;">${p.rating.toFixed(1)} <span style="color:#9ca3af;">(${p.reviewCount})</span></span>
      </div>
      <div style="margin-top:auto;padding-top:.5rem;">
        ${p.priceFrom ? '<p style="font-size:.7rem;color:#6b7280;margin-bottom:2px;">A partir de</p>' : ''}
        <p style="font-size:1rem;font-weight:700;color:#111827;">${formatPrice(price)}</p>
        <button style="margin-top:.75rem;width:100%;font-size:.75rem;font-weight:600;color:#2563eb;border:1.5px solid #bfdbfe;border-radius:.5rem;padding:.5rem;background:#fff;cursor:pointer;transition:all .2s;"
          onmouseover="this.style.background='#2563eb';this.style.color='#fff'"
          onmouseout="this.style.background='#fff';this.style.color='#2563eb'">
          ${btnLabel}
        </button>
      </div>
    </div>
  </a>`;
}
