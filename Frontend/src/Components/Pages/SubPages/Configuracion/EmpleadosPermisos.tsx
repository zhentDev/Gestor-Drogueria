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
interface BackendUser {
  id: number;
  tipo_doc: string;
  num_doc: string;
  username: string;
  name: string;
  last_name?: string;
  full_name: string;
  email?: string;
  address?: string;
  phone?: string;
  role: 'admin' | 'vendedor' | 'cajero';
  is_active: boolean;
  created_at: string;
}

interface NewUserData {
  tipo_doc: string;
  num_doc: string;
  password: string;
  name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  role: 'admin' | 'vendedor' | 'cajero';
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
  const [selectedUser, setSelectedUser] = useState<BackendUser | null>(null);
  const [users, setUsers] = useState<BackendUser[]>([]); // Estado para la lista de usuarios
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<NewUserData>({
    tipo_doc: 'CC',
    num_doc: '',
    password: '',
    name: '',
    last_name: '',
    address: '',
    phone: '',
    email: '',
    role: 'vendedor', // Rol por defecto
  });

    const fetchUsers = async () => {

      setLoading(true);

      setError(null);

      try {

        const token = localStorage.getItem('authToken');

        if (!token) {

          throw new Error('No hay token de autenticación. Inicie sesión.');

        }

  

        const response = await fetch('http://localhost:3000/api/users', {

          headers: {

            'Authorization': `Bearer ${token}`

          }

        });

        if (!response.ok) {

          const errData = await response.json();

          throw new Error(errData.message || 'Error al cargar usuarios.');

        }

        const data = await response.json();

        setUsers(data.data.users);

      } catch (err: any) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

  

    useEffect(() => {

      if (activeTab === 'empleados' && view === 'list') {

        fetchUsers();

      }

    }, [activeTab, view]);

  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

      const { name, value } = e.target;

      setFormData(prev => ({ ...prev, [name]: value }));

    };

  

    const handleEdit = (user: BackendUser) => {

      setSelectedUser(user);

      setView("edit");

    };

  

      const handleSubmitUser = async () => {

  

        setLoading(true);

  

        setError(null);

  

        setSuccessMessage(null);

  

        try {

  

          const token = localStorage.getItem('authToken');

  

          if (!token) {

  

            throw new Error('No hay token de autenticación. Inicie sesión.');

  

          }

  

    

  

          const payload = {

  

            tipo_doc: formData.tipo_doc,

  

            num_doc: formData.num_doc,

  

            password: formData.password,

  

            name: formData.name,

  

            last_name: formData.last_name || undefined, // undefined si está vacío

  

            address: formData.address || undefined,

  

            phone: formData.phone || undefined,

  

            email: formData.email || undefined,

  

            role: formData.role,

  

          };

  

    

  

          const response = await fetch('http://localhost:3000/api/users', {

  

            method: 'POST',

  

            headers: {

  

              'Content-Type': 'application/json',

  

              'Authorization': `Bearer ${token}`

  

            },

  

            body: JSON.stringify(payload)

  

          });

  

    

  

          if (!response.ok) {

  

            const errData = await response.json();

  

            throw new Error(errData.message || 'Error al crear usuario.');

  

          }

  

    

  

          setSuccessMessage('Usuario creado correctamente!');

  

          setFormData({ // Resetear formulario

  

            tipo_doc: 'CC', num_doc: '', password: '', name: '', last_name: '', address: '', phone: '', email: '', role: 'vendedor'

  

          });

  

          setView('list'); // Volver a la lista

  

          setStep(1); // Resetear paso

  

          fetchUsers(); // Actualizar lista de usuarios

  

        } catch (err: any) {

  

          setError(err.message);

  

        } finally {

  

          setLoading(false);

  

        }

  

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
                      setError(null); // Limpiar errores
                      setSuccessMessage(null); // Limpiar éxito
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
                        <th className="p-3 border-r">Username</th>
                        <th className="p-3 border-r">Nombre Completo</th>
                        <th className="p-3 border-r">Email</th>
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
                            {user.tipo_doc}
                          </td>
                          <td className="p-3 border-r font-mono">
                            {user.num_doc}
                          </td>
                          <td className="p-3 border-r font-bold">
                            {user.username}
                          </td>
                          <td className="p-3 border-r font-bold uppercase">
                            {user.full_name}
                          </td>
                          <td className="p-3 border-r text-xs text-gray-500 italic">
                            {user.email || 'N/A'}
                          </td>
                          <td className="p-3 border-r">{user.phone || 'N/A'}</td>
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
                            <ToggleSwitch checked={user.is_active} />
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">
                                {user.role}
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
                        name="tipo_doc"
                        type="select"
                        options={['CC', 'NIT', 'CE', 'PAS']}
                        value={formData.tipo_doc}
                        onChange={handleChange}
                        required
                      />
                      <InputField
                        label="Número de Documento"
                        name="num_doc"
                        type="text"
                        value={formData.num_doc}
                        onChange={handleChange}
                        required
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Contraseña"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in">
                      <InputField label="Nombre" name="name" type="text" value={formData.name} onChange={handleChange} required />
                      <InputField label="Apellido" name="last_name" type="text" value={formData.last_name} onChange={handleChange} />
                      <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                      <InputField label="Teléfono" name="phone" type="text" value={formData.phone} onChange={handleChange} />
                      <div className="md:col-span-2">
                         <InputField label="Dirección" name="address" type="text" value={formData.address} onChange={handleChange} />
                      </div>
                      <InputField
                        label="Rol"
                        name="role"
                        type="select"
                        options={rolesOptions}
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
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
                          onClick={() => {
                            if (validateStep1()) setStep(2);
                          }}
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
                          onClick={handleSubmitUser}
                          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                          disabled={loading}
                        >
                          <Save size={18} /> {loading ? 'Guardando...' : 'Guardar Usuario'}
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
                  Actualizar información de {selectedUser.full_name}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <InputField
                    label="Tipo Documento"
                    name="tipo_doc"
                    type="text"
                    value={selectedUser.tipo_doc}
                    onChange={()=>{}} // deshabilitado
                    disabled
                  />
                  <InputField
                    label="Número de Documento"
                    name="num_doc"
                    type="text"
                    value={selectedUser.num_doc}
                    onChange={()=>{}} // deshabilitado
                    disabled
                  />
                   <InputField
                    label="Nombre"
                    name="name"
                    type="text"
                    value={selectedUser.name}
                    onChange={()=>{}} // Temporalmente deshabilitado
                    required
                  />
                  <InputField
                    label="Apellido"
                    name="last_name"
                    type="text"
                    value={selectedUser.last_name || ''}
                    onChange={()=>{}} // Temporalmente deshabilitado
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={selectedUser.email || ''}
                    onChange={()=>{}} // Temporalmente deshabilitado
                  />
                  <InputField
                    label="Teléfono"
                    name="phone"
                    type="text"
                    value={selectedUser.phone || ''}
                    onChange={()=>{}} // Temporalmente deshabilitado
                  />
                  <div className="md:col-span-2">
                    <InputField
                        label="Dirección"
                        name="address"
                        type="text"
                        value={selectedUser.address || ''}
                        onChange={()=>{}} // Temporalmente deshabilitado
                    />
                  </div>
                   <InputField
                    label="Rol"
                    name="role"
                    type="text" // Temporalmente como texto para visualización
                    value={selectedUser.role}
                    onChange={()=>{}} // Deshabilitado por ahora
                    disabled // Deshabilitado por ahora
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
                      {rolesOptions.map((rol, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 font-bold border-r text-blue-800 uppercase">
                            {rol}
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
  name,
  type,
  options,
  value,
  onChange,
  disabled,
  required,
}: InputFieldProps) => (
  <div className="flex flex-col group">
    <label htmlFor={name} className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest group-focus-within:text-blue-600 transition-colors">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
        className="bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none py-1.5 text-sm font-semibold transition-all"
      >
        <option value="">Seleccione...</option>
        {options?.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
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
