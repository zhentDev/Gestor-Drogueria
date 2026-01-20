import { useState } from "react";
import { Store, PowerOff, List } from "lucide-react";

function GestionDeCaja() {
  const [detallesCaja, setDetallesCaja] = useState(false);
  const [detallesTiposPagos, setDetallesTiposPagos] = useState(false);
  const [detallesVentasGatos, setDetallesVentasGatos] = useState(false);

  return (
    <div className="flex flex-wrap w-full justify-start items-start h-full flex-col gap-5">
      <div className="w-2/5 h-fit m-5 p-3 border-2 border-rose-950 rounded-lg flex justify-center flex-wrap">
        <div className="h-10 items-center flex">
          <Store className="mx-2" />
          <span className="mx-2">CAJA GENERAL # 1018</span>
        </div>
        <span>-------------------------------------------------------</span>
        <div className="text-center">
          <span className="uppercase text-rose-500 my-3 text-2xl">
            abierta
          </span>
          <div className="my-3">
            <span className="uppercase my-3 mx-2 text-lg">total en caja:</span>
            <span className="mx-0 text-lg">$0</span>
            <button
              className="uppercase mx-4 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"
              onClick={() => {
                setDetallesCaja(!detallesCaja);
              }}
            >
              detalle
            </button>
            <div
              className={`flex flex-col gap-1 mt-3 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                detallesCaja ? "max-h-96" : "max-h-0"
              }`}
              id="detallesCaja"
            >
              <span className="flex justify-between items-center">
                Base: <p>00.000</p>
              </span>
              <span className="flex justify-between items-center">
                Total Ventas:{" "}
                <button
                  className="uppercase mx-4 bg-slate-300 border-indigo-800 rounded-xl px-2 py-0 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibol"
                  onClick={() => setDetallesTiposPagos(!detallesTiposPagos)}
                >
                  Detalle
                </button>{" "}
                <p>$88.900</p>
              </span>
              <span
                className={`w-full flex justify-around transition-[max-height] duration-500 ease-in overflow-hidden ${
                  detallesTiposPagos ? "max-h-96" : "max-h-0"
                }`}
              >
                <p>efectivo</p>
                <p>$0</p>
              </span>
              <span className="flex justify-between items-center">
                Devoluciones: <p>- $ 0</p>
              </span>
              <span className="flex justify-between items-center">
                Total Gastos <p>- $ 0</p>
              </span>
            </div>
          </div>
          <div className="my-3">
            <button className="mx-1 p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2 flex items-center gap-2">
              <PowerOff size={16} />
              Cierre
            </button>
            <button
              className="mx-1 p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2 flex items-center gap-2"
              onClick={() => setDetallesVentasGatos(!detallesVentasGatos)}
            >
              <List size={16} />
              Detalle
            </button>
          </div>
        </div>
      </div>
      {detallesVentasGatos ? (
        <div className="flex justify-center w-full">
          <div className="w-1/2 flex justify-center flex-col items-center ">
            <span className="mt-3 text-2xl font-semibold">Ventas</span>
            <span className="mt-3">Mostrar MENU entradas</span>
            <span className="w-full text-end my-3">
              Buscar: <input type="text" />
            </span>
            <table className="w-11/12">
              <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                <tr>
                  <td className="uppercase pl-3">fecha/hora</td>
                  <td className="uppercase pl-3">vendedor</td>
                  <td className="uppercase pl-3">cliente</td>
                  <td className="uppercase pl-3">valor</td>
                  <td className="uppercase pl-3">detalle</td>
                </tr>
              </thead>
              <tbody className="">
                <tr className="text-center border-b odd:bg-white even:bg-slate-300">
                  <td className="">1</td>
                  <td className="">2</td>
                  <td className="">3</td>
                  <td className="">4</td>
                  <td className="">5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-1/2 flex justify-center flex-col items-center">
            <span className="w-full text-center my-5 text-2xl font-semibold">
              Gastos
            </span>
            <table className="w-11/12">
              <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                <tr>
                  <td className="uppercase pl-3">fecha</td>
                  <td className="uppercase pl-3">empleado</td>
                  <td className="uppercase pl-3">causa</td>
                  <td className="uppercase pl-3">observacion</td>
                  <td className="uppercase pl-3">eliminar</td>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center border-b odd:bg-white even:bg-slate-300">
                  <td className="">1</td>
                  <td className="">2</td>
                  <td className="">3</td>
                  <td className="">4</td>
                  <td className="">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GestionDeCaja