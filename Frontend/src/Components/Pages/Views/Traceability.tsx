interface TraceabilityProps {
  onClose: () => void;
}

const Traceability: React.FC<TraceabilityProps> = ({ onClose }) => {
  return (
    <div className="flex flex-wrap w-full justify-start items-start h-full flex-col gap-5">
      <div className="w-screen h-fit m-5 p-3 border-2 border-rose-500 rounded-lg flex flex-col items-center justify-center flex-wrap shadow-md shadow-slate-400 drop-shadow-xl gap-6">
        <div className="h-fit items-center flex justify-between w-full border-b-2 border-gray-300 py-3">
          <span className="mx-2 ml-14">Trazabilidad</span>
          <button
            onClick={onClose}
            className="bg-red-400 hover:bg-red-700 text-slate-800 font-bold py-1 px-4 rounded mr-16"
          >
            x Regresar
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 w-7/12 flex flex-col items-center max-h-[80vh] overflow-y-scroll gap-2 border-2 border-slate-400">
          <div className="flex w-full justify-center items-center gap-2 mb-6">
            <label className="w-full">
              <span className="w-full mb-3 text-center">
                Escriba el nombre o codigo de barras del producto a Buscar
              </span>
              <input
                type="text"
                placeholder="Buscar producto..."
                className="my-2 py-2 size-5 focus:outline-none h-8 pb-4 w-full border-b-2 border-black"
              />
            </label>
            <button className="mx-1 grid col-span-1 h-full p-2 bg-sky-600 border-accent rounded-md px-4 py-1 text-center w-fit align-middle items-center shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2 text-white">
              <i>lupa</i>
            </button>
          </div>
          <div className="flex flex-col w-full justify-center items-center gap-2 mb-6">
            <span>
              Seleccione el rango de fechas a consultar no mayor a 12 meses
            </span>
            <div className="flex justify-center items-center flex-col sm:flex-row gap-16">
              <label className="flex gap-5 flex-col justify-center w-full rounded-md">
                <p className="w-full justify-center flex">Fecha inicio</p>
                <input
                  type="date"
                  className="mx-2 p-auto p-3 pt-4 size-5 focus:outline-none h-8 pb-4 border w-60 border-black"
                />
              </label>
              <label className="flex gap-5 flex-col justify-center w-full rounded-md">
                <p className="w-full justify-center flex">Fecha fin</p>
                <input
                  type="date"
                  className="mx-2 p-auto p-3 pt-4 size-5 focus:outline-none h-8 pb-4 border w-60 border-black"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="">
          <h2>Producto seleccionado:</h2>
          <button>Descarga Excel</button>
          <span>
            Mostrar{" "}
            <input
              type="text"
              defaultValue="10"
              title="Número de registros a mostrar"
            />{" "}
            registros
          </span>
        </div>

        <table className="w-full my-5 table-auto text-start">
          <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
            <tr>
              <th className="uppercase pl-3 w-[8%]">
                Fecha <i>org</i>
              </th>
              <th className="uppercase pl-3 w-[5%]">cantidad</th>
              <th className="uppercase pl-3 w-[10%]">Presentación</th>
              <th className="uppercase pl-3 w-[10%]">movimiento</th>
              <th className="uppercase pl-3 w-[12%]">Presentación kardex</th>
              <th className="uppercase pl-3 w-[10%]">tipo movimiento</th>
              <th className="uppercase pl-3 w-[10%]">empleado</th>
              <th className="uppercase pl-3 w-[10%]">num. factura</th>
              <th className="uppercase pl-3 w-[15%]">cliente/Proveedor</th>
              <th className="uppercase pl-3 w-[10%]">precio compra/venta</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-b odd:bg-white even:bg-slate-300">
              <td className="p-2">01/01/2024</td>
              <td className="p-2">Compra</td>
              <td className="p-2">FAC12345</td>
              <td className="p-2">Proveedor XYZ</td>
              <td className="p-2">100</td>
              <td className="p-2">100</td>
              <td className="p-2">Usuario1</td>
              <td className="p-2">Usuario1</td>
              <td className="p-2">Usuario1</td>
              <td className="p-2">Usuario1</td>
            </tr>
          </tbody>
        </table>

        <div className="flex w-full justify-between items-center gap-5 mb-6">
          <span>
            Mostrando registros del 1 al 10 de un total de 19 registros
          </span>
          <div className="">
            <button className="mx-1 p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2">
              Anterior
            </button>
            <div className="inline-block bg-slate-200 rounded-md w-fit">
              <span className="bg-blue-600 text-white size-5 focus:outline-none h-8 p-2 rounded-md pb-3 w-12 text-center mx-1.5 border border-gray-700">
                1
              </span>
              <span className="bg-slate-200 text-black size-5 focus:outline-none h-8 p-2 rounded-md pb-3 w-12 text-center mx-1.5 border border-gray-700">
                2
              </span>
            </div>
            <button className="mx-1 p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traceability;
