import { useState, useMemo } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";

// Importar los componentes de tabla simplificados
import SalesTable from "./Tables/SalesTable";
import PurchaseTable from "./Tables/PurchaseTable";
import DianPendingTable from "./Tables/DianPendingTable";

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

interface DataSources {
  Ventas: Sale[];
  Compras: Purchase[];
  "Pendientes DIAN": DianPending[];
  [key: string]: any[]; // Allow indexing with string, though more specific typing would be ideal here
}

// --- Mock Data ---
const mockSales: Sale[] = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, fecha: "2026-01-15 19:41:53", numero: `S-${9382 + i}`, doc: "222222222222", rSocial: "Consumidor Final", tipo: "TIRILLA DE VENTA", total: 11700 + (i * 100), empleado: "tatiana amaris" }));
const mockPurchases: Purchase[] = Array.from({ length: 500 }, (_, i) => ({ id: `p-${i}`, FECHA: "2026-01-14 10:00:00", CONSECUTIVO: `C-${101 + i}`, DOCTERCERO: "900123456-7", NOMTERCERO: "DISTRIBUIDORA FARMACÉUTICA S.A.S", TIPOTRANSACCION: "FACTURA DE COMPRA", TOTAL: 750000 + (i * 1000) }));
const mockDian: DianPending[] = [
  { id: 'dian-1', FECHA: '2026-01-15', CONSECUTIVO: 'FVE-201', DOCTERCERO: '123456789', NOMTERCERO: 'Cliente Varios', TIPOTRANSACCION: 'FACTURA ELECTRÓNICA', TOTAL: 58000, ERROR_DETALLE: 'Error de validación: El NIT del receptor no es válido.' },
  { id: 'dian-2', FECHA: '2026-01-14', CONSECUTIVO: 'FVE-198', DOCTERCERO: '987654321', NOMTERCERO: 'Empresa Ejemplo S.A.', TIPOTRANSACCION: 'FACTURA ELECTRÓNICA', TOTAL: 120500, ERROR_DETALLE: 'Rechazado por la DIAN: El CUFE ya existe para otro documento.' },
];

const dataSources: DataSources = {
  "Ventas": mockSales,
  "Compras": mockPurchases,
  "Pendientes DIAN": mockDian,
};


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("Ventas");
  
  // --- Lógica de Paginación Centralizada ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Memoizar cálculos para optimizar el rendimiento
  const { currentData, totalRecords, totalPages } = useMemo(() => {
    const sourceData = dataSources[activeTab] || [];
    const total = sourceData.length;
    const pages = total > 0 ? Math.ceil(total / itemsPerPage) : 1;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const current = sourceData.slice(firstIndex, lastIndex);
    return { currentData: current, totalRecords: total, totalPages: pages };
  }, [activeTab, currentPage, itemsPerPage]);

  const firstRecordOnPage = totalRecords > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const lastRecordOnPage = Math.min(currentPage * itemsPerPage, totalRecords);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Resetear a la primera página al cambiar de pestaña
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 1) return [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const renderTable = () => {
    switch (activeTab) {
      case "Ventas":
        return <SalesTable data={currentData} />;
      case "Compras":
        return <PurchaseTable data={currentData} />;
      case "Pendientes DIAN":
        return <DianPendingTable data={currentData} />;
      default:
         return <div className="text-center py-10 text-gray-500">No hay datos disponibles para esta vista.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search size={20} className="text-gray-500" />
            </button>
            <div>
              <h1 className="text-blue-700 font-black text-lg leading-none">DROGUERIA CALADY</h1>
              <span className="text-green-600 text-xs font-bold uppercase">Calle El Mango</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-800 font-medium text-sm hidden md:block">LAURA BEATRIZ GOMEZ SANDOVAL</span>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
              <UserCircle size={24} />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-4 overflow-hidden">
          <nav className="text-sm text-gray-500 mb-4 flex justify-between flex-shrink-0">
            <div>
              <span className="hover:underline cursor-pointer">Escritorio</span> / <span className="font-bold text-gray-800">Facturas</span>
            </div>
            <div className="font-semibold text-gray-700">jueves, 15 de Enero del 2026</div>
          </nav>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg sticky top-0 z-10">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider">Listado de Facturas</h2>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex border-b border-gray-200 mb-4">
                {Object.keys(dataSources).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
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

              <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition"><Download size={14} /> PDF</button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"><Download size={14} /> EXCEL</button>
                  <div className="flex items-center gap-2 ml-4">
                    <label htmlFor="items-per-page" className="text-sm font-medium text-gray-600">Mostrar:</label>
                    <select
                      id="items-per-page"
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Buscar:</label>
                  <input type="text" className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="flex-1">
                {renderTable()}
              </div>
              
              {totalRecords > 0 && (
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Mostrando registros del <span className="font-bold">{firstRecordOnPage}</span> al <span className="font-bold">{lastRecordOnPage}</span> de un total de <span className="font-bold">{totalRecords}</span> registros
                  </div>
                  <nav aria-label="Pagination">
                    <ul className="inline-flex items-center -space-x-px">
                      <li>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                          <ChevronLeft size={16} />
                        </button>
                      </li>
                      {getPageNumbers().map((page, index) => (
                        <li key={index}>
                          <button onClick={() => typeof page === 'number' && handlePageChange(page)} disabled={typeof page !== 'number'} className={`px-3 py-2 leading-tight border ${currentPage === page ? 'text-blue-600 bg-blue-50 border-blue-300' : 'text-gray-500 bg-white border-gray-300'} ${typeof page === 'number' ? 'hover:bg-gray-100 hover:text-gray-700' : 'cursor-default'}`}>
                            {page}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">
                          <ChevronRight size={16} />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="h-10 bg-white border-t flex items-center justify-end px-6 text-xs text-gray-500 flex-shrink-0">
          © 2021 Copyright: <a href="#" className="ml-1 text-blue-600 font-bold">Club del Droguista</a>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;

