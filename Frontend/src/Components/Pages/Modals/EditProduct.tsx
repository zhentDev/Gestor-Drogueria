import React, { useState } from 'react';

interface EditProductProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    const [isMosdalOpenHelp, setIsMosdalOpenHelp] = useState(false);
    const handleOpenModalHelp = () => { setIsMosdalOpenHelp(true); }
    const handleCloseModalHelp = () => { setIsMosdalOpenHelp(false); }

    return (
        <div className="flex flex-wrap w-full justify-start items-start h-full flex-col gap-5">
            {isMosdalOpenHelp ? (
                <div className='fixed inset-auto bg-gray-500 bg-opacity-75 flex items-center justify-center w-full h-auto p-8'>
                    <i></i>
                    <p className='w-1/4'>Un producto puede tener asociados varios códigos de barra para después ser buscado, ejemplo: "Vitamina C" que se creó con varias presentaciones (Unidad, sobre y caja) los diferentes códigos de barras se podrán adicionar. Utilizar la pistola o digitar el nuevo código asociado y presione el boton, se verán reflejados en la tabla inferior.</p>
                    <button onClick={handleCloseModalHelp}>OK</button>
                </div>
            ) : (null)}
            <div className="w-screen h-fit m-5 p-3 border-2 border-rose-500 rounded-lg flex flex-col items-center justify-center flex-wrap shadow-md shadow-slate-400 drop-shadow-xl gap-6">
                <div className="h-fit items-center flex justify-between w-full border-b-2 border-gray-300 py-3">
                    <span className="mx-2">Gestión de productos</span>
                    <button
                        onClick={onClose}
                        className="bg-red-400 hover:bg-red-700 text-slate-800 font-bold py-1 px-4 rounded"
                    >
                        x Regresar
                    </button>
                </div>
                <div className="bg-white rounded-lg p-8 w-2/5 flex flex-col items-center max-h-[80vh] overflow-y-auto gap-2 border-2 border-slate-400">
                    <h2 className="text-xl font-bold mb-4 uppercase">códigos de barra</h2>
                    <button onClick={handleOpenModalHelp}><i>?</i>Ayuda</button>
                    <div className="flex w-full justify-center items-center gap-2">
                        <input type="text" />
                        <button>Agregar</button>
                    </div>
                    <table className="w-11/12">
                        <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                            <tr className="flex justify-between border-t-2">
                                <td className="uppercase pl-3 text-center w-full" colSpan={2}>CÓDIGO</td>
                                <td className="uppercase pl-3 text-center w-full" colSpan={2}>ELIMINAR</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex justify-between border-t-2">
                                <td className='mr-12'>
                                    <span>71651051020</span>
                                </td>
                                <td className='mr-12'>
                                    <span><i>BASURA</i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-12 w-9/12 gap-4 border-b-2 border-gray-300 pb-4">
                    <div className="grid col-span-8 gap-2">
                        <label className='w-full' htmlFor="name">Nombre Producto</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Categoria</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Registro invima</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Fabricante</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Régimen Tributario</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Sustituto (Opcional)</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Porcentaje de Comisión</label>
                        <input className='w-full border-b-4 border-black mb-4 pb-4' type="text" />
                    </div>
                    <div></div>
                    <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-500 items-center justify-center p-2">
                        <span className="grid col-span-2">- ¿Este producto se requiere fórmula medica?</span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="si">si</label>
                            <input className='m-2 py-2' type="radio" name="si" />
                        </span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="no">no</label>
                            <input className='m-2 py-2' type="radio" name="no" />
                        </span>
                    </div>
                    <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-500 items-center justify-center p-2">
                        <span className="grid col-span-2">- ¿Maneja inventario?</span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="si">si</label>
                            <input className='m-2 py-2' type="radio" name="si" />
                        </span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="no">no</label>
                            <input className='m-2 py-2' type="radio" name="no" />
                        </span>
                    </div>
                    <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-500 items-center justify-center p-2">
                        <span className="grid col-span-2">- ¿Maneja vencimiento?</span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="si">si</label>
                            <input className='m-2 py-2' type="radio" name="si" />
                        </span>
                        <span className='h-10 items-center text-center flex justify-center'>
                            <label className='m-2 py-2' htmlFor="no">no</label>
                            <input className='m-2 py-2' type="radio" name="no" />
                        </span>
                    </div>
                    <div className="grid col-start-5 col-span-4 text-center items-center justify-center p-2">
                        <span className="grid col-span-2">Ubicación Punto de Venta</span>
                        <input type="text" />
                        <button>+</button>
                    </div>
                </div>
                <div className="grid grid-cols-12 w-9/12 gap-4 border-b-2 border-gray-300 pb-4">
                    <label className='col-span-4 col-start-5' htmlFor="">Precio medio compra</label>
                    <input className='col-span-4 col-start-5' type="text" />
                    <label className='col-span-4 col-start-5' htmlFor="">Último precio compra</label>
                    <input className='col-span-4 col-start-5' type="text" />
                </div>

                <div className="grid grid-cols-12 w-9/12 gap-4">
                    <span className='col-span-12'>Prestaciónes, Contenido y Precios de Venta</span>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">General</h2>
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2' htmlFor="">Presentación
                                    <select className='w-full' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% utilidad Deseado
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">- Precio de Venta
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% de utilidad Real.
                                    <input className='col-span-2' type="text" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">Intermedio</h2>
                        <input type="checkbox" name="" id="" />
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2' htmlFor="">Presentación
                                    <select className='w-full' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% utilidad Deseado
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">- Precio de Venta
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% de utilidad Real.
                                    <input className='col-span-2' type="text" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">Mínima</h2>
                        <input type="checkbox" name="" id="" />
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2' htmlFor="">Presentación
                                    <select className='w-full' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% utilidad Deseado
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">- Precio de Venta
                                    <input className='col-span-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% de utilidad Real.
                                    <input className='col-span-2' type="text" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default EditProduct;