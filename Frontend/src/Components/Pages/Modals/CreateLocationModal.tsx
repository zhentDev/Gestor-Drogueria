import React, { useState } from "react";
import { X, MapPin } from "lucide-react";

interface CreateLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateLocationModal: React.FC<CreateLocationModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [locationName, setLocationName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationName.trim()) {
      onCreate(locationName);
      setLocationName("");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 uppercase tracking-tight">
            Agregar ubicación de productos
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-sm"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="relative">
            <label
              htmlFor="location-name"
              className="text-sm font-bold text-gray-500"
            >
              Ubicación de productos
            </label>
            <input
              type="text"
              id="location-name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            <MapPin size={18} />
            <span>Agregar ubicación</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocationModal;
