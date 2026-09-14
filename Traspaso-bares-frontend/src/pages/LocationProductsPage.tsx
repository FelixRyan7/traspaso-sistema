import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useLocationProducts,
} from "../hooks/orderHooks/useLocationProduct";



import { useWorkspaceLocation } from "../hooks/PosHooks/useLocation";

import { ErrorState } from "../components/ui/Alerts/ErrorState";
import { useAdminProducts } from "../hooks/useAdminProducts";

type Filter = "all" | "assigned" | "unassigned";

export default function LocationProductsPage() {
  const { locationId } = useParams<{ locationId: string }>();

  const id = Number(locationId);

  const {
    data: locationProducts = [],
    isLoading: locationProductsLoading,
    error: locationProductsError,
  } = useLocationProducts(id);

  const {
    data: adminProductsData,
    isLoading: adminProductsLoading,
    error: adminProductsError,
  } = useAdminProducts();

  const { data: location } = useWorkspaceLocation(id);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const companyProducts = adminProductsData?.products ?? [];

  const assignedProductIds = useMemo(() => {
    return new Set(
      locationProducts.map((product) => product.productId)
    );
  }, [locationProducts]);

  const products = useMemo(() => {
    return companyProducts.map((product) => ({
      ...product,
      assigned: assignedProductIds.has(product.id),
    }));
  }, [companyProducts, assignedProductIds]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch === "" ||
        product.name.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "all" ||
        (filter === "assigned" && product.assigned) ||
        (filter === "unassigned" && !product.assigned);

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const assignedCount = products.filter(
    (product) => product.assigned
  ).length;

  const isLoading =
    locationProductsLoading || adminProductsLoading;

  const error =
    locationProductsError || adminProductsError;

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-dark">
          Gestionar productos{" "}
          <span className="text-primary">
            {location?.name}
          </span>
        </h2>

        <p className="mt-2 text-sm text-gray-dark">
          Selecciona los productos disponibles en este punto de venta.
        </p>
      </div>

      {/* PANEL */}
      <div className="rounded-3xl bg-white-soft p-6 shadow-sm">
        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-md">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-medium text-dark"
            >
              Buscar producto
            </label>

            <input
              id="product-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre..."
              className="
                w-full
                rounded-xl
                border
                border-gray-light
                bg-white
                px-4
                py-3
                text-sm
                text-dark
                outline-none
                transition
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-dark">
              Mostrar
            </span>

            <div className="flex rounded-xl bg-gray-light/40 p-1">
              {[
                { value: "all", label: "Todos" },
                { value: "assigned", label: "Asignados" },
                { value: "unassigned", label: "No asignados" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setFilter(option.value as Filter)
                  }
                  className={`
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                      filter === option.value
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-dark hover:text-dark"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark">
              Productos
            </h3>

            <p className="mt-1 text-sm text-gray-dark">
              {assignedCount} de {products.length} asignados
            </p>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {filteredProducts.length} productos
          </span>
        </div>

        {/* PRODUCTS */}
        <div className="overflow-hidden rounded-2xl border border-gray-light bg-white">
          {filteredProducts.length > 0 ? (
            <div className="divide-y divide-gray-light">
              {filteredProducts.map((product) => (
                <label
                  key={product.id}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    transition
                    hover:bg-gray-light/20
                  "
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={product.assigned}
                      onChange={() => {}}
                      className="
                        h-5
                        w-5
                        cursor-pointer
                        rounded
                        border-gray-light
                        text-primary
                        focus:ring-primary/30
                      "
                    />

                    <div>
                      <p className="text-sm font-semibold text-dark">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-dark">
                        {product.category}
                        {product.subcategory &&
                          ` · ${product.subcategory}`}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        product.assigned
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-light/50 text-gray-dark"
                      }
                    `}
                  >
                    {product.assigned
                      ? "Asignado"
                      : "No asignado"}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-dark">
                  No se encontraron productos
                </h3>

                <p className="mt-2 text-sm text-gray-dark">
                  Prueba con otra búsqueda o filtro.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
