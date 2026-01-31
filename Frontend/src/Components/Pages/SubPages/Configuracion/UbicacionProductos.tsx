import React, { useState } from "react";
import { MapPin, Edit2, Trash2, ChevronUp } from "lucide-react";
import CreateLocationModal from "../../Modals/CreateLocationModal";

// --- INTERFACES ---
interface LocationEntry {
  id: number;
  name: string;
}

const UbicacionProductos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Datos de ejemplo basados en tu HTML
  const [locations, setLocations] = useState<LocationEntry[]>([
    { id: 1, name: "Estanteria 1 nivel 1" },
    { id: 2, name: "ESTANTERIA 2 NIVEL 7" },
    { id: 3, name: "ESTANTERIA 2 NIVEL 7" },
    { id: 4, name: "VITRINA 2" },
    { id: 5, name: "VITRINA 2" },
    { id: 6, name: "VITRINA 2" },
  ]);

  const handleEdit = (id: number) => {
    console.log("Editando ubicación:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminando ubicación:", id);
  };

  const handleCreateLocation = (name: string) => {
    console.log("Nueva ubicación creada:", name);
    const newLocation = { id: locations.length + 1, name };
    setLocations([...locations, newLocation]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen font-sans w-full h-full">
      <div className="max-w-5xl mx-auto">
        {/* Panel Principal */}
        <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
          {/* Header del Panel */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-700 uppercase tracking-tight">
              Ubicaciones de productos
            </h2>
          </div>

          <div className="p-6">
            {/* Botón Crear Ubicación */}
            <div className="mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-black text-xs hover:bg-green-700 transition shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5 uppercase tracking-wider"
              >
                <MapPin size={18} />
                Crear ubicación
              </button>
            </div>

            {/* Contenedor de Tabla */}
            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
              <table className="custom-datatable w-full text-left text-sm border-collapse bg-white">
                <thead className="bg-gray-100 text-gray-700 uppercase text-[11px] font-black tracking-widest border-b border-gray-200">
                  <tr>
                    <th className="p-4 border-r text-center w-40">
                      <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                        OPCIONES{" "}
                        <ChevronUp size={14} className="text-gray-400" />
                      </div>
                    </th>
                    <th className="p-4">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                        UBICACIONES{" "}
                        <ChevronUp size={14} className="text-gray-400" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {locations.map((loc) => (
                    <tr
                      key={loc.id}
                      className="even:bg-gray-50/50 hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="p-2 border-r text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(loc.id)}
                            className="p-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 transition active:scale-90"
                            title="Editar"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(loc.id)}
                            className="p-2 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 transition active:scale-90"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-800 uppercase tracking-tight">
                        {loc.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer de Tabla (Paginación/Info) */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-end items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>
                  1-{locations.length} de {locations.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CreateLocationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateLocation}
        />
      </div>
    </div>
  );
};

export default UbicacionProductos;
