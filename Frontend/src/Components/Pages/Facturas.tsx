import { useState, useMemo } from "react";
import { Search, Download, UserCircle } from "lucide-react";
import SalesTable from "./Tables/SalesTable";
import PurchaseTable from "./Tables/PurchaseTable";
import DianPendingTable from "./Tables/DianPendingTable";
import { useTableControls } from "../../hooks/useTableControls";
import { TableControls } from "../TableControls";

// --- INTERFACES ---
interface Sale {
  id: number;
  fecha: string;
  numero: string;
  doc: string;
  rSocial: string;
  tipo: string;
  total: number;
  empleado: string;
}

interface Purchase {
  id: string;
  FECHA: string;
  CONSECUTIVO: string;
  DOCTERCERO: string;
  NOMTERCERO: string;
  TIPOTRANSACCION: string;
  TOTAL: number;
}

interface DianPending {
  id: string;
  FECHA: string;
  CONSECUTIVO: string;
  DOCTERCERO: string;
  NOMTERCERO: string;
  TIPOTRANSACCION: string;
  TOTAL: number;
  ERROR_DETALLE: string;
}

type DataSources = {
  [key: string]: any[];
};

// --- Mock Data ---
const mockSales: Sale[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  fecha: "2026-01-15 19:41:53",
  numero: `S-${9382 + i}`,
  doc: "222222222222",
  rSocial: "Consumidor Final",
  tipo: "TIRILLA DE VENTA",
  total: 11700 + i * 100,
  empleado: "tatiana amaris",
}));
const mockPurchases: Purchase[] = Array.from({ length: 500 }, (_, i) => ({
  id: `p-${i}`,
  FECHA: "2026-01-14 10:00:00",
  CONSECUTIVO: `C-${101 + i}`,
  DOCTERCERO: "900123456-7",
  NOMTERCERO: "DISTRIBUIDORA FARMACÉUTICA S.A.S",
  TIPOTRANSACCION: "FACTURA DE COMPRA",
  TOTAL: 750000 + i * 1000,
}));
const mockDian: DianPending[] = [
  {
    id: "dian-1",
    FECHA: "2026-01-15",
    CONSECUTIVO: "FVE-201",
    DOCTERCERO: "123456789",
    NOMTERCERO: "Cliente Varios",
    TIPOTRANSACCION: "FACTURA ELECTRÓNICA",
    TOTAL: 58000,
    ERROR_DETALLE: "Error de validación: El NIT del receptor no es válido.",
  },
  {
    id: "dian-2",
    FECHA: "2026-01-14",
    CONSECUTIVO: "FVE-198",
    DOCTERCERO: "987654321",
    NOMTERCERO: "Empresa Ejemplo S.A.",
    TIPOTRANSACCION: "FACTURA ELECTRÓNICA",
    TOTAL: 120500,
    ERROR_DETALLE:
      "Rechazado por la DIAN: El CUFE ya existe para otro documento.",
  },
];

const dataSources: DataSources = {
  Ventas: mockSales,
  Compras: mockPurchases,
  "Pendientes DIAN": mockDian,
};

const searchKeysMap: { [key: string]: string[] } = {
  Ventas: ["numero", "rSocial", "empleado", "doc"],
  Compras: ["CONSECUTIVO", "NOMTERCERO", "DOCTERCERO"],
  "Pendientes DIAN": ["CONSECUTIVO", "NOMTERCERO", "ERROR_DETALLE"],
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("Ventas");

  const activeData = useMemo(() => dataSources[activeTab] || [], [activeTab]);
  const activeSearchKeys = useMemo(
    () => searchKeysMap[activeTab] || [],
    [activeTab],
  );

  const {
    paginatedData,
    handleSearch,
    handleRowsPerPageChange,
    ...tableControls
  } = useTableControls({
    initialData: activeData,
    searchKeys: activeSearchKeys,
    initialRowsPerPage: 10,
  });

  const renderTable = () => {
    // Pass the paginated data to the corresponding table component
    switch (activeTab) {
      case "Ventas":
        return <SalesTable data={paginatedData as Sale[]} />;
      case "Compras":
        return <PurchaseTable data={paginatedData as Purchase[]} />;
      case "Pendientes DIAN":
        return <DianPendingTable data={paginatedData as DianPending[]} />;
      default:
        return (
          <div className="text-center py-10 text-gray-500">
            No hay datos disponibles para esta vista.
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900 w-10/12">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search size={20} className="text-gray-500" />
            </button>
            <div>
              <h1 className="text-blue-700 font-black text-lg leading-none">
                DROGUERIA CALADY
              </h1>
              <span className="text-green-600 text-xs font-bold uppercase">
                Calle El Mango
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-800 font-medium text-sm hidden md:block">
              LAURA BEATRIZ GOMEZ SANDOVAL
            </span>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
              <UserCircle size={24} />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* This nav seems out of place, but keeping it per original structure */}
          <nav className="text-sm text-gray-500 mb-4 flex justify-between flex-shrink-0">
            <div>
              <span className="hover:underline cursor-pointer">Escritorio</span>{" "}
              / <span className="font-bold text-gray-800">Facturas</span>
            </div>
            <div className="font-semibold text-gray-700">
              jueves, 15 de Enero del 2026
            </div>
          </nav>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg sticky top-0 z-10">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider">
                Listado de Facturas
              </h2>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex border-b border-gray-200 mb-4">
                {Object.keys(dataSources).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 font-bold text-sm transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white rounded-t-lg"
                        : "text-blue-400 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* --- NEW TABLE CONTROLS --- */}
              <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition">
                    <Download size={14} /> PDF
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition">
                    <Download size={14} /> EXCEL
                  </button>
                </div>
                <div className="flex-grow">
                  <TableControls
                    searchTerm={tableControls.searchTerm}
                    handleSearch={handleSearch}
                    rowsPerPage={tableControls.rowsPerPage}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                    totalResults={tableControls.totalResults}
                    currentPage={tableControls.currentPage}
                    pageCount={tableControls.pageCount}
                    goToPage={tableControls.goToPage}
                    nextPage={tableControls.nextPage}
                    prevPage={tableControls.prevPage}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {paginatedData.length > 0 ? (
                  renderTable()
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No se encontraron resultados para "
                    {tableControls.searchTerm}".
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="h-10 bg-white border-t flex items-center justify-end px-6 text-xs text-gray-500 flex-shrink-0">
          © 2021 Copyright:{" "}
          <a href="#" className="ml-1 text-blue-600 font-bold">
            Club del Droguista
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
