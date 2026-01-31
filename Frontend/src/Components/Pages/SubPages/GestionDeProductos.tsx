import { useState } from "react";
import EditProduct from "../Views/EditProduct";
import Traceability from "../Views/Traceability";
import ProductDetails from "../Modals/ProductDetails";
import ProductBalances from "../Modals/ProductBalances";
import InventoryAdjustment from "../Modals/InventoryAdjustment";
import { useTableControls } from "../../../hooks/useTableControls";
import { TableControls } from "../../TableControls";
import { Plus, Eye, Trash2, Edit as EditIcon, Sliders, BarChart2 } from "lucide-react";

// --- INTERFACES & MOCK DATA ---
interface Product {
    id: number;
    name: string;
    manufacturer: string;
    quantity: number;
    unit: string;
}

const mockProducts: Product[] = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: `Producto de Prueba #${i + 1}`,
    manufacturer: `Fabricante ${(i % 10) + 1}`,
    quantity: Math.floor(Math.random() * 200),
    unit: "Unidad",
}));


type ActiveView = "main" | "edit" | "traceability";

function GestionDeProductos() {
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [isModalOpenBalances, setIsModalOpenBalances] = useState(false);
  const [isModalOpenInventoryAdjustment, setIsModalOpenInventoryAdjustment] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("main");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    paginatedData,
    handleSearch,
    handleRowsPerPageChange,
    ...tableControls
  } = useTableControls({
    initialData: mockProducts,
    searchKeys: ['name', 'manufacturer'],
  });

  const handleOpenModal = (setter: React.Dispatch<React.SetStateAction<boolean>>, product: Product) => {
    setSelectedProduct(product);
    setter(true);
  };
  
  const handleCloseModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
    setSelectedProduct(null);
  };

  const handleViewChange = (view: ActiveView, product?: Product) => {
    setSelectedProduct(product || null);
    setActiveView(view);
  };

  if (activeView === "edit" && selectedProduct) {
    return <EditProduct product={selectedProduct} onClose={() => handleViewChange("main")} />;
  }

  if (activeView === "traceability" && selectedProduct) {
    return <Traceability product={selectedProduct} onClose={() => handleViewChange("main")} />;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen text-gray-800 font-sans w-full">
        <div className="max-w-7xl mx-auto space-y-4">
            <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 md:p-6">
                    <div className="flex justify-center mb-6">
                        <button
                            // onClick={() => {}} // TODO: Implement Add Product View/Modal
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
                        >
                            <Plus size={18} /> Agregar Producto
                        </button>
                    </div>

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
                        searchPlaceholder="Buscar por nombre o fabricante..."
                    />

                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="w-full text-left text-sm border-collapse bg-white">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] font-black tracking-wider">
                                <tr>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Fabricante</th>
                                    <th className="p-3 text-right">Cant/Nat</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((product) => (
                                        <tr key={product.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="p-3 font-bold">{product.name}</td>
                                            <td className="p-3 text-gray-600">{product.manufacturer}</td>
                                            <td className="p-3 text-right font-mono">{`${product.quantity} ${product.unit}`}</td>
                                            <td className="p-3 text-center">
                                                <div className="flex justify-center items-center gap-1">
                                                    <ActionButton onClick={() => handleOpenModal(setIsModalOpenDetails, product)} icon={Eye} title="Detalle" />
                                                    <ActionButton onClick={() => handleViewChange("edit", product)} icon={EditIcon} title="Editar" />
                                                    <ActionButton onClick={() => handleOpenModal(setIsModalOpenBalances, product)} icon={BarChart2} title="Saldos" />
                                                    <ActionButton onClick={() => {}} icon={Trash2} title="Eliminar" className="hover:bg-red-100 hover:text-red-600" />
                                                    <ActionButton onClick={() => handleOpenModal(setIsModalOpenInventoryAdjustment, product)} icon={Sliders} title="Ajuste" />
                                                    <ActionButton onClick={() => handleViewChange("traceability", product)} icon={BarChart2} title="Trazabilidad" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center p-8 text-gray-500">
                                            No se encontraron productos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Modals --- */}
        {selectedProduct && (
            <>
                <ProductDetails isOpen={isModalOpenDetails} onClose={() => handleCloseModal(setIsModalOpenDetails)} product={selectedProduct} />
                <ProductBalances isOpen={isModalOpenBalances} onClose={() => handleCloseModal(setIsModalOpenBalances)} product={selectedProduct} />
                <InventoryAdjustment isOpen={isModalOpenInventoryAdjustment} onClose={() => handleCloseModal(setIsModalOpenInventoryAdjustment)} product={selectedProduct} />
            </>
        )}
    </div>
  );
}

// Helper component for action buttons in the table
const ActionButton = ({ onClick, icon: Icon, title, className = '' }) => (
    <button
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors ${className}`}
    >
        <Icon size={16} />
    </button>
);


export default GestionDeProductos;