import React from "react";
import { X, Server } from "lucide-react";

interface CashBox {
  id: number;
  name: string;
  isActive: boolean;
}

interface CashBoxListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashBoxes: CashBox[];
}

const CashBoxListModal: React.FC<CashBoxListModalProps> = ({
  isOpen,
  onClose,
  cashBoxes,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-3 bg-gray-50 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-sm"
            title="Cerrar"
          >
            <X size={18} />
          </button>
          <span className="ml-4 font-bold text-gray-700 uppercase tracking-tight">
            Listado de Cajas
          </span>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {cashBoxes.map((box) => (
              <li
                key={box.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Server size={20} className="text-gray-500" />
                  <span className="font-medium">{box.name}</span>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    box.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {box.isActive ? "Activa" : "Inactiva"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CashBoxListModal;