import { Search as SearchIcon } from "lucide-react";

function Search() {
  return (
    <div className="flex gap-3 mb-5 flex-wrap items-center justify-center">
      <div className="flex gap-3 flex-wrap items-center justify-center">
        <div className="max-w-full h-full">
          <input
            type="search"
            about="search"
            className="block p-2 pl-10 w-80 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm"
            placeholder="Buscar..."
          />
          <optgroup>
            <option value="">Mostrar resultados preliminares*</option>
          </optgroup>
        </div>
        <div className="flex gap-2 items-center h-full justify-center">
          <button className="bg-slate-300 border-indigo-800 rounded-lg ext-center align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold flex items-center gap-2 h-full py-8 px-1" title="Buscar" aria-label="Buscar">
            <SearchIcon size={15} />
          </button>
          <label htmlFor="search">Seleccionar producto IVA %0</label>
        </div>
      </div>
    </div>
  );
}

export default Search;
