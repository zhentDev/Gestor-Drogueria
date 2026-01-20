import { useState, useMemo } from "react";
import {
  SortIcon,
  SearchIcon,
  ExportIcon,
  ChevronLeft,
  ChevronRight,
} from "../../Icons";
import { inventoryData } from "../../../Data/inventarioData";

// --- Componente principal ---
export default function InformacionInventario() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalInventoryValue = useMemo(() => {
    return inventoryData.reduce(
      (acc, item) => acc + item.quantity * item.unitCost,
      0
    );
  }, [inventoryData]);

  // Lógica para filtrar, ordenar y paginar los datos
  const processedData = useMemo(() => {
    let sortableItems = [...inventoryData];

    // Filtrado por búsqueda
    if (searchTerm) {
      sortableItems = sortableItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenamiento
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [searchTerm, sortConfig]);

  // Paginación
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatCurrency = (number) => {
    if (typeof number !== "number") return number;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const headers = [
    { key: "id", label: "CÓDIGO DE BARRAS" },
    { key: "name", label: "NOMBRE DE PRODUCTO" },
    { key: "manufacturer", label: "FABRICANTE" },
    { key: "quantity", label: "CANTIDAD" },
    { key: "location", label: "UBICACIÓN" },
    { key: "lotQuantity", label: "CANTIDAD LOTE" },
    { key: "invima", label: "INVIMA" },
    { key: "pvp", label: "PRESENTACIONES PVP" },
    { key: "totalQuantity", label: "CANTIDAD" },
    { key: "totalCost", label: "COSTO TOTAL" },
    { key: "globalPresentationCost", label: "COSTO DE PRESENTACIÓN GLOBAL" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Cabecera con totales --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-500 text-white p-1 rounded-lg shadow flex items-center justify-between">
            <div className="px-3 py-2 font-semibold">
              VALOR TOTAL INVENTARIO
            </div>
            <div className="bg-orange-100 text-gray-800 px-4 py-2 rounded-md font-bold text-lg">
              {formatCurrency(totalInventoryValue)}
            </div>
          </div>
          <div className="bg-orange-500 text-white p-1 rounded-lg shadow flex items-center justify-between">
            <div className="px-3 py-2 font-semibold">
              DIAS DE INVENTARIO RESTANTES
            </div>
            <div className="bg-orange-100 text-gray-800 px-4 py-2 rounded-md font-bold text-lg">
              66 DÍAS
            </div>
          </div>
        </div>

        {/* --- Contenedor de la tabla --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* --- Barra de herramientas de la tabla --- */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl text-gray-800 font-bold ">
              Informe de inventario
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="category-select" className="sr-only">
                Filtrar por categoría
              </label>
              <select
                id="category-select"
                className="w-36 h-10 pb-2 border border-black rounded-lg p-2"
              >
                <option value="">TODAS</option>
              </select>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium">
                <ExportIcon />
                Exportar
              </button>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* --- Tabla --- */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                    >
                      <button
                        onClick={() => requestSort(header.key)}
                        className="flex items-center"
                      >
                        {header.label}
                        <SortIcon
                          direction={
                            sortConfig.key === header.key
                              ? sortConfig.direction
                              : null
                          }
                        />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {item.manufacturer}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {/* Ubicación data missing */}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {/* Cantidad Lote data missing */}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {/* Invima data missing */}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {/* Presentaciones PVP data missing */}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatCurrency(item.quantity * item.unitCost)}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {/* Costo de presentación global data missing */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Paginación --- */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 text-end">
                  Items por página{" "}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={200}>200</option>
                  </select>
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  a{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, processedData.length)}
                  </span>{" "}
                  de <span className="font-medium">{processedData.length}</span>{" "}
                  resultados
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
