import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateCashBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateCashBoxModal: React.FC<CreateCashBoxModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [boxName, setBoxName] = useState("");

  // Si el modal no está abierto, no renderiza nada
  // if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boxName.trim()) {
      onCreate(boxName);
      setBoxName(""); // Limpiar campo tras crear
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Tarjeta del Modal */}
      <div
        className={`bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior (Header) */}
        <div className="flex items-center p-3 bg-gray-50 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-sm"
            title="Cerrar"
          >
            <X size={18} />
          </button>
          <span className="ml-4 font-bold text-gray-700 uppercase tracking-tight">
            Creación de caja
          </span>
        </div>

        {/* Cuerpo del Modal */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Input Estilo Material (Borde inferior) */}
          <div className="relative group">
            <input
              type="text"
              id="box-name"
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
              className="peer w-full py-2 bg-transparent border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors font-medium"
              placeholder=" "
              required
              autoFocus
            />
            <label
              htmlFor="box-name"
              className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-all duration-200 
                         peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-bold
                         peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Nombre de caja
            </label>
          </div>

          {/* Botón de Acción Principal */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-black uppercase tracking-widest
                       hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
          >
            Crear caja
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCashBoxModal;
