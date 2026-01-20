import React, { useState } from "react";
import {
  Plus,
  Edit,
  PlayCircle,
  Save,
  ArrowLeft,
  ArrowRight,
  X,
  Download,
  Search,
} from "lucide-react";

// --- INTERFACES ---
interface User {
  id: number;
  tipoDoc: string;
  numDoc: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  estado: boolean;
  rol: "ADMINISTRADOR" | "CAJERO";
}

interface Role {
  id: number;
  nombre: string;
}

const EmpleadosPermisos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"empleados" | "roles">(
    "empleados",
  );
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [step, setStep] = useState(1); // Para el formulario de pasos
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Datos de ejemplo
  const [users] = useState<User[]>([
    {
      id: 2467,
      tipoDoc: "CC",
      numDoc: "1019114554",
      nombre: "LAURA BEATRIZ",
      apellido: "GOMEZ SANDOVAL",
      direccion: "CALLE EL MANGO",
      telefono: "3126189088",
      estado: true,
      rol: "ADMINISTRADOR",
    },
    {
      id: 3564,
      tipoDoc: "CC",
      numDoc: "52337815",
      nombre: "tatiana",
      apellido: "amaris",
      direccion: "Cl 127 DBisA #91C - 29",
      telefono: "3126189088",
      estado: true,
      rol: "CAJERO",
    },
  ]);

  const [roles] = useState<Role[]>([
    { id: 1, nombre: "CAJERO" },
    { id: 2, nombre: "ADMINISTRADOR" },
  ]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setView("edit");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Botón Tutorial */}
        <div className="flex justify-start">
          <button className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded font-bold hover:bg-gray-700 transition shadow-md text-sm uppercase tracking-wider">
            <PlayCircle size={18} /> Ver Tutorial
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
          {/* Navegación por Tabs */}
          <div className="bg-gray-50 border-b border-gray-200 flex p-2 gap-2">
            <button
              onClick={() => {
                setActiveTab("empleados");
                setView("list");
              }}
              className={`px-6 py-2 rounded-md text-xs font-black transition-all uppercase ${activeTab === "empleados" ? "bg-blue-600 text-white shadow" : "text-gray-500 hover:bg-gray-200"}`}
            >
              Empleados
            </button>
            <button
              onClick={() => {
                setActiveTab("roles");
                setView("list");
              }}
              className={`px-6 py-2 rounded-md text-xs font-black transition-all uppercase ${activeTab === "roles" ? "bg-blue-600 text-white shadow" : "text-gray-500 hover:bg-gray-200"}`}
            >
              Roles
            </button>
          </div>

          <div className="p-4 md:p-6">
            {/* VISTA: LISTADO DE EMPLEADOS */}
            {activeTab === "empleados" && view === "list" && (
              <div className="animate-in fade-in duration-500">
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => {
                      setView("add");
                      setStep(1);
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
                  >
                    <Plus size={18} /> Agregar usuario
                  </button>
                </div>

                {/* Filtros y Exportar */}
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <button className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition shadow">
                    <Download size={14} /> Excel
                  </button>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-sm border-collapse bg-white">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] font-black tracking-wider">
                      <tr>
                        <th className="p-3 border-r">T. Doc</th>
                        <th className="p-3 border-r"># Documento</th>
                        <th className="p-3 border-r">Nombre</th>
                        <th className="p-3 border-r">Apellido</th>
                        <th className="p-3 border-r">Dirección</th>
                        <th className="p-3 border-r">Teléfono</th>
                        <th className="p-3 border-r text-center">Editar</th>
                        <th className="p-3 border-r text-center">Estado</th>
                        <th className="p-3 text-center">Rol</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-blue-50/50 transition-colors"
                        >
                          <td className="p-3 border-r text-gray-500">
                            {user.tipoDoc}
                          </td>
                          <td className="p-3 border-r font-mono">
                            {user.numDoc}
                          </td>
                          <td className="p-3 border-r font-bold uppercase">
                            {user.nombre}
                          </td>
                          <td className="p-3 border-r font-bold uppercase">
                            {user.apellido}
                          </td>
                          <td className="p-3 border-r text-xs text-gray-500 italic">
                            {user.direccion}
                          </td>
                          <td className="p-3 border-r">{user.telefono}</td>
                          <td className="p-3 border-r text-center">
                            <button
                              type="button"
                              onClick={() => handleEdit(user)}
                              title="Editar usuario"
                              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 shadow-sm"
                            >
                              <Edit size={14} />
                            </button>
                          </td>
                          <td className="p-3 border-r text-center">
                            <ToggleSwitch checked={user.estado} />
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                {user.rol}
                              </span>
                              <button className="text-[9px] font-bold text-green-600 hover:underline">
                                CAMBIAR
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VISTA: AGREGAR USUARIO (PASOS) */}
            {activeTab === "empleados" && view === "add" && (
              <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-center font-bold text-gray-600 mb-8 italic">
                  Los siguientes son datos únicos por cada usuario de su
                  droguería
                </p>

                <div className="space-y-6">
                  {step === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <InputField
                        label="Tipo Documento"
                        type="select"
                        options={["CC", "NIT", "CE"]}
                        required
                      />
                      <InputField
                        label="Número de Documento"
                        type="text"
                        required
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in">
                      <InputField label="Nombre" type="text" required />
                      <InputField label="Apellido" type="text" required />
                      <InputField label="Dirección" type="text" />
                      <InputField label="Teléfono" type="number" />
                      <div className="md:col-span-2">
                        <InputField
                          label="Contraseña"
                          type="password"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center gap-4 pt-4">
                    {step === 1 ? (
                      <>
                        <button
                          onClick={() => setView("list")}
                          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                        >
                          <ArrowLeft size={18} /> Regresar
                        </button>
                        <button
                          onClick={() => setStep(2)}
                          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                        >
                          Siguiente <ArrowRight size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setStep(1)}
                          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                        >
                          <ArrowLeft size={18} /> Atrás
                        </button>
                        <button
                          onClick={() => setView("list")}
                          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                        >
                          <Save size={18} /> Guardar Usuario
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VISTA: EDITAR USUARIO */}
            {activeTab === "empleados" && view === "edit" && selectedUser && (
              <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
                <p className="text-center font-bold text-gray-600 mb-8 border-b pb-2">
                  Actualizar información de {selectedUser.nombre}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <InputField
                    label="Tipo Documento"
                    type="text"
                    value={selectedUser.tipoDoc}
                    disabled
                  />
                  <InputField
                    label="Número de Documento"
                    type="text"
                    value={selectedUser.numDoc}
                    disabled
                  />
                  <InputField
                    label="Nombre"
                    type="text"
                    value={selectedUser.nombre}
                    required
                  />
                  <InputField
                    label="Apellido"
                    type="text"
                    value={selectedUser.apellido}
                    required
                  />
                  <InputField
                    label="Dirección"
                    type="text"
                    value={selectedUser.direccion}
                  />
                  <InputField
                    label="Teléfono"
                    type="number"
                    value={selectedUser.telefono}
                  />
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition text-sm">
                    Cambiar Contraseña
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                  >
                    <Save size={18} /> Guardar Cambios
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                  >
                    <X size={18} /> Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* VISTA: ROLES */}
            {activeTab === "roles" && (
              <div className="max-w-xl mx-auto animate-in fade-in duration-500">
                <div className="flex justify-center mb-6">
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                    <Plus size={18} /> Agregar Rol Nuevo
                  </button>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm bg-white">
                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-4 border-r">Rol Nombre</th>
                        <th className="p-4 text-center">Editar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {roles.map((rol) => (
                        <tr
                          key={rol.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 font-bold border-r text-blue-800">
                            {rol.nombre}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              type="button"
                              title="Editar rol"
                              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition shadow-sm"
                            >
                              <Edit size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const InputField = ({
  label,
  type,
  options,
  value,
  disabled,
  required,
}: any) => (
  <div className="flex flex-col group">
    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest group-focus-within:text-blue-600 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        aria-label={label}
        className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1.5 text-sm font-semibold transition-all"
      >
        <option value="">Seleccione...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={label}
        defaultValue={value}
        disabled={disabled}
        className={`bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1.5 text-sm font-semibold transition-all ${disabled ? "opacity-50 cursor-not-allowed italic" : ""}`}
      />
    )}
    <div className="hidden group-invalid:block text-[9px] text-red-500 mt-1 font-bold">
      Campo requerido
    </div>
  </div>
);

const ToggleSwitch = ({ checked }: { checked: boolean }) => (
  <div className="flex justify-center items-center">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={checked}
        title="Cambiar estado"
        aria-label="Cambiar estado del empleado"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default EmpleadosPermisos;
