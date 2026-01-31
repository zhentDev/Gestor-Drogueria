import MainBanner from "../MainBanner";
import ProductTable from "../ProductTable";
import Search from "../Search";

function Ventas() {
  return (
    <div className="h-screen w-11/12 flex flex-col justify-start items-center">
      <MainBanner />
      <div className="h-auto w-full flex justify-center items-center bg-slate-50 rounded-lg p-3 gap-10 border border-slate-300 shadow-md shadow-slate-400">
        <div className="h-full flex flex-col w-9/12 justify-start items-end bg-slate-50 rounded-lg p-3 flex-wrap">
          <button className="bg-secondary border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold mx-7">
            Eliminar venta actual
          </button>
          <ProductTable />
        </div>
        <span className="h-full w-0 border border-l-2"></span>
        <div className="h-auto w-11/12 flex justify-center items-center bg-slate-50 flex-col">
          <div className="rounded-lg p-3 border mb-3">
            <Search />
            <div className="flex flex-wrap gap-5 my-3 pb-4">
              <h2 className="uppercase text-sm text-orange-700 w-full">
                comisión:
              </h2>
              <div className="w-full flex justify-between items-center">
                <span>
                  <p>Preasignación</p>
                  <p>Requerido</p>
                </span>
                <div className="flex gap-5 m-0 px-2">
                  <div className="w-20">
                    <span>Cantidad</span>
                    <input type="text" className="w-full" placeholder="1" />
                    <p>Requerido</p>
                  </div>
                  <div className="w-20">
                    <span>%Descuento</span>
                    <input type="text" className="w-full" placeholder="0%" />
                  </div>
                  <div className="w-24">
                    <span>Precio Venta</span>
                    <input type="text" className="w-full" placeholder="$0" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-3 w-full">
              <button className="bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold mx-2">
                +Agregar
              </button>
              <button className="bg-secondary border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold mx-2">
                Eliminar
              </button>
            </div>
          </div>
          <div className="inline-flex">
            <span className="mx-3 mb-2 text-xl">Total:</span>
            <span className="mx-3 mb-2 text-teal-600 font-bold text-xl">
              $0
            </span>
          </div>
          <button className="bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold m-2 text-xl">
            Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ventas;
