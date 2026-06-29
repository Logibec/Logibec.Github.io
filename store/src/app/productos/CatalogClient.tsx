"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { categoryMeta } from "@/lib/utils";

interface Props {
  products: Product[];
}

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
];

const categories = [
  { value: "", label: "Todos" },
  { value: "smartphones", label: "Smartphones" },
  { value: "gaming", label: "Gaming" },
  { value: "wearables", label: "Wearables" },
  { value: "audio", label: "Audio" },
  { value: "tablets", label: "Tablets" },
];

export default function CatalogClient({ products }: Props) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "";
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = category ? products.filter((p) => p.category === category) : [...products];

    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, category, sort]);

  const heading = category ? categoryMeta[category]?.label ?? category : "Todos los productos";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">{heading}</h1>
        <p className="text-gray-500 mt-1">{filtered.length} productos encontrados</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                category === cat.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <div className="sm:ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No hay productos en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
