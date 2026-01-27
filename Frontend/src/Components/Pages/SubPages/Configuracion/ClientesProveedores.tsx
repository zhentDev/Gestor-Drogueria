import React, { useState } from "react";
import { Send, XCircle, Plus, FileEdit, Download, Users } from "lucide-react";
import { useTableControls } from "../../../../hooks/useTableControls";
import { TableControls } from "../../../TableControls";

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

  // Datos de ejemplo
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
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${27000 + i}`,
      tipoDoc: "NIT",
      numDoc: `${901000000 + i}`,
      dv: "1",
      razonSocial: `Proveedor Ficticio ${i + 1}`,
      direccion: `Calle Falsa 123-${i}`,
      contacto: `Contacto ${i + 1}`,
      telefono: `31012345${i < 10 ? "0" : ""}${i}`,
      ciudad: "BOGOTA",
    })),
  ];

  const {
    paginatedData,
    handleSearch,
    handleRowsPerPageChange,
    ...tableControls
  } = useTableControls({
    initialData: data,
    searchKeys: ["numDoc", "razonSocial", "contacto", "ciudad"],
    initialRowsPerPage: 5,
  });

  const handleEdit = (id: string) => {
    console.log("Editando tercero:", id);
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-blue-600" /> Gestión de Proveedores y
            Clientes
          </h2>
        </div>

        <div className="p-4 md:p-6">
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

          {showForm && (
            <form className="bg-gray-50 p-6 rounded-xl border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                >
                  <Send size={18} /> Enviar
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
            searchPlaceholder="Buscar por documento, razón social..."
          />

          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm mt-4">
            <table className="w-full text-left text-sm border-collapse bg-white">
              <thead className="bg-gray-50 text-gray-700 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="p-3">Acción</th>
                  <th className="p-3">T. Documento</th>
                  <th className="p-3">Documento</th>
                  <th className="p-3">DV</th>
                  <th className="p-3">Razón Social</th>
                  <th className="p-3">Dirección</th>
                  <th className="p-3">Contacto</th>
                  <th className="p-3">Teléfono</th>
                  <th className="p-3">Ciudad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="p-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-bold hover:bg-blue-700 transition"
                        >
                          <FileEdit size={12} /> EDITAR
                        </button>
                      </td>
                      <td className="p-3">{item.tipoDoc}</td>
                      <td className="p-3 font-mono">{item.numDoc}</td>
                      <td className="p-3 text-center">{item.dv}</td>
                      <td className="p-3 font-bold uppercase">
                        {item.razonSocial}
                      </td>
                      <td className="p-3 text-gray-500 italic">
                        {item.direccion}
                      </td>
                      <td className="p-3">{item.contacto}</td>
                      <td className="p-3">{item.telefono}</td>
                      <td className="p-3">{item.ciudad}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center p-8 text-gray-500">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      <select
        aria-label={label}
        className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1 text-sm transition font-medium"
      >
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
