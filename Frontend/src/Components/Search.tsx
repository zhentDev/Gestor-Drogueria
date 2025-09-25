
function Search() {
    return (
        <search className='flex gap-3 mb-5 flex-wrap items-center justify-center'>
            <div className="max-w-full">
                <input type="search" about='search' className="block p-2 pl-10 w-80 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm" placeholder="Buscar..." />
                <optgroup>
                    <option value="">
                        Mostrar resultados preliminares*
                    </option>
                </optgroup>
            </div>
            <button className='bg-slate-300 border-indigo-800 rounded-xl px-2 py-1 text-center align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold h-20'>
                buscar* Icono
            </button>
            <label htmlFor="search">Seleccionar producto IVA %0</label>
        </search>
    )
}

export default Search