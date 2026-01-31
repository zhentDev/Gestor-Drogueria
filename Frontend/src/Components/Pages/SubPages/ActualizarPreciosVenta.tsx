import { useState } from "react";

// --- Iconos SVG (para no necesitar dependencias externas) ---
const InfoCircleIcon = () => (
  <svg
    className="w-4 h-4 mr-1 inline-block"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const PlusIcon = () => (
  <svg
    className="w-4 h-4 mr-1 inline-block"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    ></path>
  </svg>
);

export default function ActualizarPreciosVenta() {
  const [activeTab, setActiveTab] = useState("step1");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Obtener la fecha actual para mostrar en el encabezado
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("es-ES", options);
  };

  const manufacturers = [
    { value: "", label: "Seleccione Fabricante" },
    { value: "gsk", label: "GSK" },
    { value: "reckitt_benckiser", label: "RECKITT BENCKISER" },
    { value: "tecnoquimicas", label: "TECNOQUIMICAS S.A." },
    { value: "bayer", label: "BAYER S.A." },
    // Agrega más fabricantes si los tienes
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Archivo seleccionado para cargar: ${selectedFile.name}`);
      // Aquí iría la lógica para enviar el archivo al servidor
    } else {
      alert("Por favor, selecciona un archivo primero.");
    }
  };

  return (
    <main
      id="js-page-content"
      role="main"
      className="page-content p-2 sm:p-4 lg:p-6 bg-gray-50 min-h-screen font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <ol className="flex text-sm text-gray-600 mb-4 items-center relative">
          <li className="breadcrumb-item">
            <a href="escritorio" className="hover:text-blue-600">
              Escritorio
            </a>
            <span className="mx-2">/</span>
          </li>
          <li className="breadcrumb-item">
            <a href="vwInventarios" className="hover:text-blue-600">
              Inventarios
            </a>
            <span className="mx-2">/</span>
          </li>
          <li className="breadcrumb-item active text-blue-700 font-medium">
            <a href="masivoPreciosVenta">Masivo Precios Venta</a>
          </li>
          <li className="absolute top-0 right-0 hidden sm:block text-gray-500">
            <span className="js-get-date">{getFormattedDate()}</span>
          </li>
        </ol>

        <div className="text-xl font-semibold text-primary-600 text-blue-800 mb-4">
          LAURA BEATRIZ GOMEZ SANDOVAL
        </div>

        {/* Panel principal */}
        <div
          id="panel-1"
          className="panel bg-white rounded-lg shadow-md col-span-full"
        >
          {/* Panel Header */}
          <div className="panel-hdr p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Masivo Precios de Venta Por Laboratorio
            </h2>
          </div>

          {/* Panel Container */}
          <div id="miApp" className="panel-container show p-4">
            {/* Warning Alert */}
            <div
              role="alert"
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md"
            >
              <h4 className="font-bold text-lg mb-2">Advertencia</h4>
              <p className="text-sm">
                Antes de realizar alguna acción sobre esta funcionalidad, por
                favor visualizar el
                <button
                  type="button"
                  onClick={() =>
                    window.open("https://youtu.be/DCFuNZgaLy8", "_blank")
                  }
                  className="ml-2 inline-flex items-center px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-md hover:bg-yellow-600 transition-colors duration-200"
                >
                  <InfoCircleIcon /> Tutorial
                </button>
                y tener en cuenta las siguientes recomendaciones:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>
                  Si el código de barras esta asociado a varios puntos, el
                  sistema actualizará el primer producto encontrado con los
                  precios suministrados en el archivo.
                </li>
                <li>
                  Cuando un producto NO tiene HABILITADA la presentación y se
                  llena el campo de precio en el archivo, el sistema no lo
                  tendrá en cuenta. Por favor antes de cargar, hacer esta
                  edición para que quede actualizado correctamente.
                </li>
                <li>
                  Recuerde que hacer esta actualización masiva, NO TIENE MARCHA
                  ATRÁS, por lo cual se debe hacer con cuidado y responsabilidad
                  del usuario ADMINISTRADOR.
                </li>
              </ul>
            </div>

            {/* Tabs */}
            <div className="card border rounded-lg overflow-hidden">
              <div className="card-header border-b bg-gray-50">
                <ul role="tablist" className="flex -mb-px">
                  <li role="presentation" className="flex-1">
                    <button
                      onClick={() => setActiveTab("step1")}
                      className={`block px-4 py-2 text-sm font-medium border-b-2 ${
                        activeTab === "step1"
                          ? "border-blue-600 text-blue-600 bg-white"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      aria-selected={activeTab === "step1"}
                    >
                      Paso 1: Consultar Precios de Venta Por Fabricante
                    </button>
                  </li>
                  <li role="presentation" className="flex-1">
                    <button
                      onClick={() => setActiveTab("step2")}
                      className={`block px-4 py-2 text-sm font-medium border-b-2 ${
                        activeTab === "step2"
                          ? "border-blue-600 text-blue-600 bg-white"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      aria-selected={activeTab === "step2"}
                    >
                      Paso 2: Cargue Masivo de Precios de Venta por Fabricante
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content p-4">
                {activeTab === "step1" && (
                  <div id="step1-content">
                    <div
                      role="alert"
                      className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-md"
                    >
                      <p className="text-sm">
                        Seleccione el fabricante y descargue la base de
                        productos para editar precios de venta ↓↓↓
                      </p>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="manufacturer-select"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Seleccione Fabricante
                      </label>
                      <select
                        id="manufacturer-select"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={selectedManufacturer}
                        onChange={(e) =>
                          setSelectedManufacturer(e.target.value)
                        }
                      >
                        {manufacturers.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          window.open("https://youtu.be/DCFuNZgaLy8", "_blank")
                        }
                        className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition-colors duration-200"
                      >
                        <InfoCircleIcon /> Tutorial
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Consultar Fabricante/Laboratorio
                      </button>
                    </div>

                    {/* Placeholder for the table */}
                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-4">
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">
                          Excel
                        </button>
                        <div className="relative">
                          <input
                            type="search"
                            className="block w-48 pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar:"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                            {/* SVG for search icon can be added here if needed */}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-x-auto border border-gray-200 rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                CODIGOS BARRAS
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                NOMBRE
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                PVP GLOBAL
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                PVP INTERMEDIO
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                PVP MINIMO
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td
                                colSpan={5}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                              >
                                No hay datos disponibles
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                        <span>Mostrando 0 a 0 de 0 entradas</span>
                        <div className="flex">
                          <button
                            disabled
                            className="px-3 py-1 border border-gray-300 rounded-l-md bg-white text-gray-500 cursor-not-allowed"
                          >
                            Anterior
                          </button>
                          <button
                            disabled
                            className="px-3 py-1 border border-gray-300 rounded-r-md bg-white text-gray-500 cursor-not-allowed ml-px"
                          >
                            Siguiente
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "step2" && (
                  <div id="step2-content">
                    <div
                      role="alert"
                      className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-md"
                    >
                      <p className="text-sm">
                        Cargue el archivo para validación y envío de
                        actualización de precios
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                      <div className="col-span-full">
                        <b className="block text-gray-700 text-sm mb-2">
                          Seleccione archivo para cambiar precios en bloque
                        </b>
                        <div className="custom-file mb-3">
                          <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-gray-700 sr-only"
                          >
                            Cargar archivo
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors duration-200">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                  <span>Cargar un archivo</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".xlsx"
                                    onChange={handleFileChange}
                                  />
                                </label>
                                <p className="pl-1">o arrastrar y soltar</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                Archivo .xlsx
                              </p>
                              {selectedFile && (
                                <p className="text-xs text-blue-600 mt-1">
                                  Archivo seleccionado:{" "}
                                  <span className="font-semibold">
                                    {selectedFile.name}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-full text-right">
                        <button
                          type="button"
                          onClick={handleUpload}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          <PlusIcon /> CARGAR
                        </button>
                      </div>
                    </div>

                    {/* Placeholder for the second table */}
                    <div className="mt-8 overflow-x-auto border border-gray-200 rounded-md">
                      <table
                        id="tab2"
                        className="min-w-full divide-y divide-gray-200"
                      >
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                              COLUMNA 1
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                              COLUMNA 2
                            </th>
                            {/* Add more columns as needed for tab2 */}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td
                              colSpan={2}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                            >
                              Esperando carga de archivo...
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
