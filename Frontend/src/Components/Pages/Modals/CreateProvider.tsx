import React, { useState, useEffect, useRef } from "react";
import { ciudadesConDepartamento } from "../../../Data/colombia";

interface CreateProviderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProvider: React.FC<CreateProviderProps> = ({ isOpen, onClose }) => {
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cityInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityInputRef.current &&
        !cityInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    if (value.length > 0) {
      const filteredSuggestions = ciudadesConDepartamento.filter((ciudad) =>
        ciudad.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions(ciudadesConDepartamento);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCityInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClearCity = () => {
    setCityInput("");
  };

  const toggleSuggestions = () => {
    if (showSuggestions) {
      setShowSuggestions(false);
    } else {
      setSuggestions(ciudadesConDepartamento);
      setShowSuggestions(true);
    }
  };

  const handleCreateProvider = () => {
    console.log("Proveedor creado (simulado)");
    // Aquí iría la lógica para enviar los datos del formulario
    onClose(); // Cierra el modal después de crear
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center w-full h-auto">
      <div className="bg-white rounded-lg p-8 w-10/12 flex flex-col items-center max-h-[80vh] overflow-y-auto gap-2">
        <div className="w-8/12 flex flex-col items-center">
          <label className="w-full text-start flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2 ">Crear Proveedor</h2>
            <span onClick={onClose} className="hover:cursor-pointer">
              x
            </span>
          </label>

          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="grid col-span-4 mt-3">
              <div className="flex items-center gap-x-4">
                <span className="font-medium">Tipo:</span>
                <label
                  htmlFor="cliente_chk"
                  className="flex items-center gap-2"
                >
                  <input
                    id="cliente_chk"
                    type="checkbox"
                    className="h-4 w-4 border-2"
                  />
                  <span>Clientes</span>
                </label>
                <label
                  htmlFor="proveedor_chk"
                  className="flex items-center gap-2"
                >
                  <input
                    id="proveedor_chk"
                    type="checkbox"
                    className="h-4 w-4"
                  />
                  <span>Proveedores</span>
                </label>
                <label htmlFor="local_chk" className="flex items-center gap-2">
                  <input id="local_chk" type="checkbox" className="h-4 w-4" />
                  <span>Local/Traslados</span>
                </label>
              </div>
            </div>

            <div className="grid col-span-2 mt-3">
              <span>Tipo Documento</span>
              <select
                id="documentTypeSelect"
                className="w-full border-b-2 border-black pb-4 focus:outline-none h-fit py-1 text-lg"
                title="Selecciona un tipo de documento"
              >
                <option value="">Cedula</option>
                <option value="">Nit</option>
                <option value="">Tarjeta de identidad</option>
                <option value="">Cedula de Extrangería</option>
                <option value="">Pasaporte</option>
              </select>
            </div>
            <div className="grid col-span-2 mt-3">
              <span>Nit/Doc</span>
              <input
                type="text"
                name="nit_doc"
                id="nit_doc"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese Nit/Doc"
                title="Nit/Doc"
              />
            </div>
            <div className="grid col-span-4 mt-3">
              <span>Razón social/Nombre Completo</span>
              <input
                type="text"
                name="razon_social"
                id="razon_social"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese Razón social/Nombre Completo"
                title="Razón social/Nombre Completo"
              />
            </div>
            <div className="grid col-span-4 mt-3 relative" ref={cityInputRef}>
              <span>Ciudad:</span>
              <div className="relative w-full">
                <input
                  type="text"
                  value={cityInput}
                  onChange={handleCityInputChange}
                  onFocus={() => {
                    setSuggestions(ciudadesConDepartamento);
                    setShowSuggestions(true);
                  }}
                  placeholder="Escribe para buscar una ciudad"
                  className="w-full border-b-2 border-black pr-16 pb-4 focus:outline-none h-fit py-1 text-lg"
                  title="Selecciona una ciudad"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  {cityInput && (
                    <button
                      onClick={handleClearCity}
                      className="p-2"
                      title="Limpiar"
                    >
                      &#x2715;
                    </button>
                  )}
                  <button
                    onClick={toggleSuggestions}
                    className="p-2"
                    title="Mostrar/Ocultar"
                  >
                    &#x25BC;
                  </button>
                </div>
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid col-span-4 mt-3">
              <span>Dirección:</span>
              <input
                type="text"
                name="direccion"
                id="direccion"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese la dirección"
                title="Dirección"
              />
            </div>
            <div className="grid col-span-3 mt-3">
              <span>Nombre de Contacto:</span>
              <input
                type="text"
                name="nombre_contacto"
                id="nombre_contacto"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese el nombre de contacto"
                title="Nombre"
              />
            </div>
            <div className="grid col-span-1 mt-3">
              <span>Teléfono Contacto:</span>
              <input
                type="text"
                name="telefono_contacto"
                id="telefono_contacto"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese el teléfono"
                title="Teléfono"
              />
            </div>
            <div className="grid col-span-4 mt-3">
              <span>Email:</span>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
                placeholder="Ingrese la dirección de email"
                title="Email"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCreateProvider}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProvider;
