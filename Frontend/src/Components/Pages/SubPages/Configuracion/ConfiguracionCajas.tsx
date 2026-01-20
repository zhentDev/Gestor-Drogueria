import React, { useState } from "react";
import { Calculator, ClipboardList } from "lucide-react";
import CreateCashBoxModal from "../../Modals/CreateCashBoxModal";
import CashBoxListModal from "../../Modals/CashBoxListModal";

const ConfiguracionCajas: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // Placeholder data for cash boxes
  const cashBoxes = [
    { id: 1, name: "Caja Principal", isActive: true },
    { id: 2, name: "Caja 2", isActive: false },
    { id: 3, name: "Caja Domicilios", isActive: true },
  ];

  const handleCreateBox = (name: string) => {
    console.log("Nueva caja creada:", name);
    // Aquí llamarías a tu API para guardar la caja
    setIsCreateModalOpen(false); // Cerrar modal al terminar
  };

  return (
    <div className="flex flex-wrap justify-center items-start w-full h-full p-8 gap-6">
      {/* Botón: Crear Cajas */}
      <button
        type="button"
        className="group relative flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-1/3 p-6 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 active:scale-95 transition-all duration-200"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <div className="p-3 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
          <Calculator size={32} />
        </div>
        <span className="text-lg font-black uppercase tracking-wider">
          Crear cajas
        </span>
      </button>

      {/* Botón: Listar Cajas */}
      <button
        type="button"
        className="group relative flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-1/3 p-6 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-200"
        onClick={() => setIsListModalOpen(true)}
      >
        <div className="p-3 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
          <ClipboardList size={32} />
        </div>
        <span className="text-lg font-black uppercase tracking-wider">
          Listar cajas
        </span>
      </button>

      <CreateCashBoxModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateBox}
      />
      <CashBoxListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        cashBoxes={cashBoxes}
      />
    </div>
  );
};

export default ConfiguracionCajas;
