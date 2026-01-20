import React, { useState } from "react";
import {
  PaperPlane,
  XCircle,
  Plus,
  FileEdit,
  Download,
  Search,
  Users,
  Truck,
  Building,
} from "lucide-react";

// --- DEFINICIÓN DE TIPOS ---
interface Partner {
  id: string;
  tipoDoc: string;
  numDoc: string;
  dv: string;
  razonSocial: string;
  direccion: string;
  contacto: string;
  telefono: string;
  ciudad: string;
}

const ClientesProveedores: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "proveedores" | "clientes" | "locales"
  >("proveedores");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo basados en tu tabla
  const data: Partner[] = [
    {
      id: "15637",
      tipoDoc: "NIT",
      numDoc: "1065894920",
      dv: "0",
      razonSocial: "aguachica cesar",
      direccion: "kra 190-65 laureles",
      contacto: "bladimir camargo",
      telefono: "316500678",
      ciudad: "AGUACHICA",
    },
    {
      id: "16051",
      tipoDoc: "NIT",
      numDoc: "1045725290",
      dv: "0",
      razonSocial: "surtiprecios",
      direccion: "cra 12 11 16",
      contacto: "chica",
      telefono: "3005178383",
      ciudad: "EL BANCO",
    },
    {
      id: "26469",
      tipoDoc: "NIT",
      numDoc: "901343573",
      dv: "0",
      razonSocial: "farmaventas distribuciones",
      direccion: "magangue",
      contacto: "comercializadora todo drogas",
      telefono: "0",
      ciudad: "MAGANGUE",
    },
  ];

  const handleEdit = (id: string) => {
    console.log("Editando tercero:", id);
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Cabecera del Panel */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-blue-600" /> Gestión de Proveedores y
            Clientes
          </h2>
        </div>

        <div className="p-4 md:p-6">
          {/* Navegación de Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <TabButton
              label="Proveedores"
              active={activeTab === "proveedores"}
              onClick={() => setActiveTab("proveedores")}
            />
            <TabButton
              label="Clientes"
              active={activeTab === "clientes"}
              onClick={() => setActiveTab("clientes")}
            />
            <TabButton
              label="Locales / Traslados"
              active={activeTab === "locales"}
              onClick={() => setActiveTab("locales")}
            />
          </div>

          {/* Formulario de Registro (Condicional) */}
          {showForm && (
            <form className="bg-gray-50 p-6 rounded-xl border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selección de Tipo */}
                <div className="col-span-full">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Tipo de Tercero:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <RadioButton
                      id="type-client"
                      name="partnerType"
                      label="CLIENTES"
                    />
                    <RadioButton
                      id="type-provider"
                      name="partnerType"
                      label="PROVEEDORES"
                      defaultChecked
                    />
                    <RadioButton
                      id="type-local"
                      name="partnerType"
                      label="LOCAL/TRASLADOS"
                    />
                    <RadioButton
                      id="type-mixed"
                      name="partnerType"
                      label="MIXTO (CLIENTE / PROVEEDOR)"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <InputField
                    label="Tipo Documento"
                    type="select"
                    options={["NIT", "CC", "CE"]}
                    required
                  />
                  <InputField
                    label="Nit / Documento"
                    type="text"
                    placeholder="Ej: 1065894920"
                    required
                  />
                  <InputField
                    label="Razón Social / Nombre Completo"
                    type="text"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <InputField
                    label="Ciudad"
                    type="select"
                    options={["AGUACHICA", "EL BANCO", "MAGANGUE"]}
                    required
                  />
                  <InputField label="Dirección" type="text" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Nombre Contacto" type="text" />
                    <InputField label="Teléfono Contacto" type="number" />
                  </div>
                </div>

                <div className="col-span-full">
                  <InputField label="Email" type="email" />
                </div>
              </div>

              {/* Botones de Acción Formulario */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                >
                  <PaperPlane size={18} /> Enviar
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  <XCircle size={18} /> Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Botón Agregar (Solo visible si el form está oculto) */}
          {!showForm && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
              >
                <Plus size={20} /> Agregar {activeTab.slice(0, -1)}
              </button>
            </div>
          )}

          {/* Barra de Herramientas de Tabla */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded text-sm font-bold hover:bg-green-700 transition shadow">
              <Download size={16} /> Exportar Excel
            </button>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabla de Resultados */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm border-collapse bg-white">
              <thead className="bg-gray-50 text-gray-700 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="p-3 border-r border-b">Acción</th>
                  <th className="p-3 border-r border-b">T. Documento</th>
                  <th className="p-3 border-r border-b">Documento</th>
                  <th className="p-3 border-r border-b">DV</th>
                  <th className="p-3 border-r border-b">Razón Social</th>
                  <th className="p-3 border-r border-b">Dirección</th>
                  <th className="p-3 border-r border-b">Contacto</th>
                  <th className="p-3 border-r border-b">Teléfono</th>
                  <th className="p-3 border-b">Ciudad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-2 border-r">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-bold hover:bg-blue-700 transition"
                      >
                        <FileEdit size={12} /> EDITAR
                      </button>
                    </td>
                    <td className="p-3 border-r">{item.tipoDoc}</td>
                    <td className="p-3 border-r font-mono">{item.numDoc}</td>
                    <td className="p-3 border-r text-center">{item.dv}</td>
                    <td className="p-3 border-r font-bold uppercase">
                      {item.razonSocial}
                    </td>
                    <td className="p-3 border-r text-gray-500 italic">
                      {item.direccion}
                    </td>
                    <td className="p-3 border-r">{item.contacto}</td>
                    <td className="p-3 border-r">{item.telefono}</td>
                    <td className="p-3">{item.ciudad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación (Simulada) */}
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <span>
              Mostrando registros 1 al {data.length} de {data.length}{" "}
              encontrados
            </span>
            <div className="flex gap-1">
              <button
                disabled
                className="px-3 py-1 border rounded bg-gray-50 text-gray-400"
              >
                Anterior
              </button>
              <button className="px-3 py-1 border rounded bg-blue-600 text-white font-bold">
                1
              </button>
              <button
                disabled
                className="px-3 py-1 border rounded bg-gray-50 text-gray-400"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES PARA LIMPIEZA DE CÓDIGO ---

const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
      active
        ? "border-blue-600 text-blue-600 bg-blue-50"
        : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

const RadioButton = ({
  id,
  name,
  label,
  defaultChecked = false,
}: {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:border-blue-300 transition cursor-pointer">
    <input
      type="radio"
      id={id}
      name={name}
      defaultChecked={defaultChecked}
      className="w-4 h-4 text-blue-600 cursor-pointer"
    />
    <label
      htmlFor={id}
      className="text-[10px] font-black text-gray-700 cursor-pointer select-none"
    >
      {label}
    </label>
  </div>
);

const InputField = ({
  label,
  type,
  placeholder,
  options,
  required = false,
}: {
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold text-gray-500 uppercase mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1 text-sm transition font-medium">
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1 text-sm transition font-medium"
      />
    )}
  </div>
);

export default ClientesProveedores;
