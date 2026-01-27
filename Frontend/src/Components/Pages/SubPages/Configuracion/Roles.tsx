import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Plus, Edit, Save, X } from "lucide-react";
import { PATHS } from "../../../../Data/paths";

const rolesOptions = ["admin", "vendedor", "cajero"]; // Mock data

const RoleList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-16 pt-10 animate-in fade-in my-auto h-full">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate(PATHS.CONFIGURACION_ROLES_AGREGAR)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
        >
          <Plus size={18} /> Agregar Rol Nuevo
        </button>
      </div>
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm bg-white">
          <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[11px]">
            <tr>
              <th className="p-4">Rol Nombre</th>
              <th className="p-4 text-center">Editar</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rolesOptions.map((rol, index) => (
              <tr key={index}>
                <td className="p-4 font-bold uppercase">{rol}</td>
                <td className="p-4 text-center">
                  <button className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600">
                    <Edit size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RoleForm: React.FC = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!roleName.trim()) {
      setError("El nombre del rol no puede estar vacío.");
      return;
    }
    setLoading(true);
    setError(null);
    console.log("Submitting new role:", roleName);
    // Mock API call
    setTimeout(() => {
      setSuccessMessage("Rol creado exitosamente!");
      setLoading(false);
      setTimeout(() => navigate(PATHS.CONFIGURACION_ROLES), 1500);
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto animate-in fade-in">
      <h3 className="text-xl font-bold mb-6 text-center">Agregar Nuevo Rol</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <div className="p-6 bg-gray-50 rounded-xl border">
        <div className="flex flex-col group">
          <label
            htmlFor="roleName"
            className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest"
          >
            Nombre del Rol <span className="text-red-500">*</span>
          </label>
          <input
            id="roleName"
            name="roleName"
            type="text"
            placeholder="Ej: Gerente"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1.5 text-sm font-semibold transition-all"
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={() => navigate(PATHS.CONFIGURACION_ROLES)}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg font-bold"
        >
          <X size={18} /> Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold"
        >
          <Save size={18} /> {loading ? "Guardando..." : "Guardar Rol"}
        </button>
      </div>
    </div>
  );
};

const Roles: React.FC = () => {
  return (
    <Routes>
      <Route index element={<RoleList />} />
      <Route path="agregar" element={<RoleForm />} />
    </Routes>
  );
};

export default Roles;
