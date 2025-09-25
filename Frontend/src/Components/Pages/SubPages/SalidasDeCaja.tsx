function SalidasDeCaja() {
  return (
    <div className="flex flex-wrap w-11/12 justify-start items-start h-full flex-col gap-5 mx-auto">
      <div className="border-2 rounded-xl border-gray-300 p-4 mx-7 my-3 w-full justify-center items-center">
        <span className="w-full py-3">Control de Salidas de Caja</span>
        <span className="flex border-2 w-full my-3"></span>
        <div className="flex justify-center flex-wrap">
          <span className="w-full text-center">Informe de Salidas de Caja</span>
          <div className="w-full flex flex-wrap">
            <label className="w-1/2 p-2">
              <h3 className="w-full">Caja:</h3>
              <select className="w-full block p-2 pl-10 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm">
                <option value="opcion.value">
                  {
                    //option.label
                  }
                </option>
              </select>
            </label>
            <label className="w-1/2 p-2">
              <h3 className="w-full">Causa:</h3>
              <select className="w-full block p-2 pl-10 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm">
                <option value="opcion.value">
                  {
                    // option.label
                  }
                </option>
              </select>
            </label>
            <label className="w-1/2 p-2">
              <h3 className="w-full">Descripción (Máx 300 carácteres):</h3>
              <input
                type="text"
                className="w-full block p-2 pl-10 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm"
              />
            </label>
            <label className="w-1/2 p-2">
              <h3 className="w-full">Valor:</h3>
              <input
                type="text"
                className="w-full block p-2 pl-10 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm"
              />
            </label>
          </div>
          <div className="m-3">
            <button className="mx-4 bg-slate-300 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold">
              Generar Salida
            </button>
            <button className="mx-4 bg-secondary my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalidasDeCaja;
