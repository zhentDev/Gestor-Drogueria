import SingleSelect from "@/Components/SingleSelect";
import React from "react";

interface DetailsProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const DetailsProduct: React.FC<DetailsProductProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center w-full h-auto">
      <div className="bg-white rounded-lg p-8 w-9/12 flex flex-col items-center max-h-[80vh] overflow-y-auto gap-6">
        <h2 className="text-xl font-bold mb-2 ">
          *Nombre Producto X cantidad 12
        </h2>
        <span className="w-full text-center">Saldos</span>
        <table className="w-11/12 border-b-2 border-gray-700">
          <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
            <tr className="flex justify-between border-t-2">
              <td className="pl-3 text-center w-full my-2 mr-12">
                <span>LOTE/FECHA</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-12">
                <span>BODEGA</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-12">
                <span>DROGERIA</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-12">
                <span>TOTAL</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-12">
                <span>EDITAR</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between border-t-2">
              {false ? (
                <>
                  <td className="mr-12">
                    <span>1</span>
                  </td>
                  <td className="mr-12">
                    <span>2</span>
                  </td>
                  <td className="mr-12">
                    <span>3</span>
                  </td>
                  <td className="mr-12">
                    <span>4</span>
                  </td>
                  <td className="mr-12">
                    <span>5</span>
                  </td>
                </>
              ) : (
                <td
                  className="py-5 w-full h-12 align-middle hover:bg-slate-200"
                  colSpan={5}
                >
                  <span className="text-red-700 text-center w-full h-full">
                    No tiene cargue incial este producto
                  </span>
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <div className="mt-0 py-3 bg-gray-300">
          <span className="w-full text-center p-10 py-2">Total Bodega:</span>
          <span className="w-full text-center p-10 py-2">Total Droguería:</span>
          <span className="w-full text-center p-10 py-2">Total Saldo:</span>
        </div>

        <button className="w-11/12 h-12 flex flex-col items-center mx-4 bg-cyan-500 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center lign-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold">
          <i></i>Cargue Inicial
        </button>

        <div className="inline-flex gap-3 items-center mt-2">
          <input
            type="checkbox"
            name=""
            id=""
            className="size-6"
            title="Registro con LOTE-FECHA"
          />
          <label htmlFor="" className="flex gap-2 items-center">
            Registro con LOTE-FECHA
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="grid col-span-1 mt-3">
            <span className="mb-2">Ubicación</span>
            <SingleSelect
              options={[]}
              name="Ubicacion"
              placeholder="Agregar Ubicación..."
              onChange={() => {}}
            />
          </div>
          <div className="grid col-span-1 mt-3">
            <span className="mb-2">Presentación</span>
            <SingleSelect
              options={[]}
              name="Presentacion"
              placeholder="Selecciona una categoría..."
              onChange={() => {}}
            />
          </div>
          <div className="grid col-span-1 mt-3">
            <span>Cantidad</span>
            <input
              type="number"
              name=""
              id=""
              className="w-full border-b-2 border-black mb-0 pb-4 focus:outline-none"
              placeholder="Ingrese la cantidad"
              title="Cantidad"
            />
          </div>
        </div>

        <button className="w-3/12 h-12 flex flex-col items-center mx-4 bg-cyan-500 my-3 border-indigo-800 rounded-xl px-2 py-1 text-center align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold">
          Agregar Item
        </button>

        <table className="w-9/12 border-b-2 border-gray-700">
          <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
            <tr className="flex justify-between border-t-2">
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>UBICACIÓN</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>LOTE</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>F.VENCIMIENTO</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>PRESENTACIÓN</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>CANTIDAD</span>
              </td>
              <td className="pl-3 text-center w-full my-2 mr-10">
                <span>ELIMINAR</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between border-t-2">
              {false ? (
                <>
                  <td className="mr-12">
                    <span>1</span>
                  </td>
                  <td className="mr-12">
                    <span>2</span>
                  </td>
                  <td className="mr-12">
                    <span>3</span>
                  </td>
                  <td className="mr-12">
                    <span>4</span>
                  </td>
                  <td className="mr-12">
                    <span>5</span>
                  </td>
                  <td className="mr-12">
                    <span>6</span>
                  </td>
                </>
              ) : (
                <td
                  className="pt-5 w-full h-12 align-middle hover:bg-slate-200"
                  colSpan={5}
                >
                  <span className="mb-5 text-red-700 text-center w-full h-full">
                    No se han registrado lotes
                  </span>
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <button className="w-3/12 h-12 flex flex-col items-center mx-4 bg-cyan-500 my-3 border-indigo-800 rounded-xl px-2 py-1 text-center align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold">
          Enviar Cargue Inicial
        </button>

        <button
          onClick={onClose}
          className="mt-4 bg-slate-200 hover:brightness-95 hover:bg-slate-300 hover:border-slate-300 text-gray-700 border-gray-700 border-2 font-semibold py-2 px-4 rounded"
        >
          {" "}
          <i>{"<-"}</i>
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetailsProduct;
