import { useState } from "react"
import EditProduct from "../Modals/EditProduct";
import ProductDetails from "../Modals/ProductDetails";

function GestionDeProductos() {

    const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const handleOpenModalDetails = () => { setIsModalOpenDetails(true); }
    const handleCloseModalDetails = () => { setIsModalOpenDetails(false); }

    const handleOpenModalEdit = () => { setIsModalOpenEdit(true); }
    const handleCloseModalEdit = () => { setIsModalOpenEdit(false); }

    return (
        isModalOpenEdit ? (
            <EditProduct isOpen={isModalOpenEdit} onClose={handleCloseModalEdit} />
        ) : (
            <div className="flex flex-wrap w-full justify-start items-start h-full flex-col gap-5">
                <div className="w-screen h-fit m-5 p-3 border-2 border-rose-500 rounded-lg flex justify-center flex-wrap shadow-md shadow-slate-400 drop-shadow-xl">
                    <div className="h-10 items-center flex justify-start w-full">
                        <span className="mx-2">Gestión de productos</span>
                    </div>
                    <span className="border border-b-2 border-gray-300 w-full my-2"></span>
                    <div className="text-center w-full">
                        <button className="mx-1 p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2">Agrega Producto</button>
                        <div className="flex flex-col gap-3 justify-start items-start">
                            <div className="w-2/5 text-start items-center h-auto">
                                <span className="text-2xl mx-2 py-1 h-auto">Mostrar</span>
                                <select className="h-fit mx-2 py-1 text-xl">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <span className=" mx-2 py-1">Registros</span>
                            </div>
                            <input type="text" className="placeholder-orange-950 w-2/5 text-start block p-2 pl-10 rounded-lg bg-gray-100 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:placeholder text-sm" placeholder="Buscar Pro cod barra ó nombre" />
                        </div>
                    </div>
                    <table className="w-11/12 my-5 table-fixed text-start">
                        <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                            <tr>
                                <td className="uppercase pl-3">producto</td>
                                <td className="uppercase pl-3">fabricante</td>
                                <td className="uppercase pl-3">cant/nat</td>
                                <td className="uppercase pl-3">detalle</td>
                                <td className="uppercase pl-3">editar</td>
                                <td className="uppercase pl-3">saldo</td>
                                <td className="uppercase pl-3">eliminar</td>
                                <td className="uppercase pl-3">ajuste</td>
                                <td className="uppercase pl-3">trazabilidad</td>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className="text-center border-b odd:bg-white even:bg-slate-300">
                                <td className="">1</td>
                                <td className="">2</td>
                                <td className="">3</td>
                                <td className=""><button onClick={handleOpenModalDetails} className="flex flex-col items-center mx-4 bg-cyan-500 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Detalle</button></td>
                                <ProductDetails isOpen={isModalOpenDetails} onClose={handleCloseModalDetails} />
                                <td className=""><button onClick={handleOpenModalEdit} className="flex flex-col items-center mx-4 bg-amber-400 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Editar</button></td>
                                <td className=""><button className="flex flex-col items-center mx-4 bg-orange-500 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Saldos</button></td>
                                <td className=""><button className="flex flex-col items-center mx-4 bg-secondary my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Eliminar</button></td>
                                <td className=""><button className="flex flex-col items-center mx-4 bg-indigo-500 text-stone-200 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Ajuste</button></td>
                                <td className=""><button className="flex flex-col items-center mx-4 bg-indigo-500 text-stone-200 my-3 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold"><i>2</i>Trazabilidad</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    )
}

export default GestionDeProductos