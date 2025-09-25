import PercentageInput from '@/Components/PercentageInput';
import SingleSelect from '@/Components/SingleSelect';
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

    const [requiresFormula, setRequiresFormula] = useState('no');
    const [managesInventory, setManagesInventory] = useState('no');
    const [managesExpiration, setManagesExpiration] = useState('no');

    const handleRequiresFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRequiresFormula(event.target.value);
    };

    const handleManagesInventoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManagesInventory(event.target.value);
    };

    const handleManagesExpirationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManagesExpiration(event.target.value);
    };

    // options
    // const categoriasDesdeBackend = [
    //     { id: 1, nombre: 'Analgésicos' },
    //     { id: 2, nombre: 'Antibióticos' },
    //     { id: 3, nombre: 'Vitaminas' }
    // ];

    // const opcionesParaSelect = categoriasDesdeBackend.map(cat => ({
    //     value: cat.id.toString(), // El 'value' debe ser string
    //     label: cat.nombre
    // }));

    // onChange
    // const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    // const handleCategoriaChange = (opcionSeleccionada) => {
    //     setCategoriaSeleccionada(opcionSeleccionada);
    //     console.log("El usuario seleccionó:", opcionSeleccionada);
    // };

    // defaultValue
    // const valorInicial = { value: '3', label: 'Vitaminas' };
    // ...
    // <SingleSelect defaultValue={valorInicial} ... />

    // isLoading
    // const [cargando, setCargando] = useState(true);

    // useEffect(() => {
    //     // fetch(...)
    //     //   .then(...)
    //     //   .finally(() => setCargando(false));
    // }, []);

    // <SingleSelect isLoading={cargando} ... />

    const [ganancia, setGanancia] = useState('');

    const handleGananciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Aquí puedes añadir validaciones si lo necesitas
        setGanancia(e.target.value);
    };

    return (
        <div className="flex flex-wrap w-full justify-start items-start h-full flex-col gap-5">
            {isMosdalOpenHelp ? (
                <div className={`fixed inset-0 z-50 flex items-center justify-center w-full bg-gray-500 bg-opacity-25 h-full p-8 flex-col ${isMosdalOpenHelp ? 'backdrop-blur-sm bg-gray-500 bg-opacity-75' : ''}`}>
                    <div className="rounded-xl bg-white flex flex-col w-2/4 h-2/5 justify-center items-center gap-4">
                        <i></i>
                        <p className='w-3/4'>Un producto puede tener asociados varios códigos de barra para después ser buscado, ejemplo: "Vitamina C" que se creó con varias presentaciones (Unidad, sobre y caja) los diferentes códigos de barras se podrán adicionar. Utilizar la pistola o digitar el nuevo código asociado y presione el boton, se verán reflejados en la tabla inferior.</p>
                        <button className='mx-1 grid col-span-1 h-full p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center w-fit align-middle items-center shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-8' onClick={handleCloseModalHelp}>OK</button>
                    </div>
                </div>
            ) : (null)}
            <div className="w-screen h-fit m-5 p-3 border-2 border-rose-500 rounded-lg flex flex-col items-center justify-center flex-wrap shadow-md shadow-slate-400 drop-shadow-xl gap-6">
                <div className="h-fit items-center flex justify-between w-full border-b-2 border-gray-300 py-3">
                    <span className="mx-2 ml-14">Gestión de productos</span>
                    <button
                        onClick={onClose}
                        className="bg-red-400 hover:bg-red-700 text-slate-800 font-bold py-1 px-4 rounded mr-16"
                    >
                        x Regresar
                    </button>
                </div>

                <div className="bg-white rounded-lg p-4 w-5/12 flex flex-col items-center max-h-[80vh] overflow-y-auto gap-2 border-2 border-slate-400">
                    <h2 className="text-xl font-bold mb-4 uppercase">códigos de barra</h2>
                    <button onClick={handleOpenModalHelp} className='mx-1 col-span-1 h-full p-2 bg-yellow-400 border-indigo-800 rounded-xl px-4 py-1 text-center w-fit align-middle items-center shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2 inline-flex gap-2'><i>?</i>Ayuda</button>
                    <div className="flex w-full justify-center items-center gap-2 mb-6">
                        <label className='w-full'>
                            <span className='w-full mb-3 text-center'>Escanea o digita el código de barras</span>
                            <input type="text" className='my-2 py-2 size-5 focus:outline-none h-8 pb-4 w-full border-b-2 border-black' />
                        </label>
                        <button className='mx-1 grid col-span-1 h-full p-2 bg-sky-600 border-accent rounded-md px-4 py-1 text-center w-fit align-middle items-center shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2 text-white'><i>mano</i>Agregar</button>
                    </div>
                    <table className="w-11/12">
                        <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                            <tr className="flex justify-between border-t-2">
                                <td className="uppercase pl-5 text-start w-full" colSpan={2}>CÓDIGO</td>
                                <td className="uppercase pl-5 text-start w-full" colSpan={2}>ELIMINAR</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex justify-between border-t-2">
                                <td className='m-2 w-full text-center'>
                                    <span className='w-full'>71651051020</span>
                                </td>
                                <td className='m-2 w-full text-start'>
                                    <span className='w-full'><i>BASURA</i></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-12 w-9/12 gap-4 border-b-2 border-gray-300 pb-4">
                    <div className="grid col-span-8 gap-2">
                        <label className='w-full' htmlFor="name">Nombre Producto</label>
                        <input className='w-full border-b-2 border-black mb-4 pb-4 focus:outline-none' type="text" />
                    </div>
                    <div className="grid col-span-4">
                        <label className='w-full' htmlFor="name">Categoria</label>
                        <SingleSelect options={[]} name='Categoría' placeholder='Selecciona una categoría...' onChange={() => { }} />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Registro invima</label>
                        <input className='w-full border-b-2 border-black mb-4 pb-6 focus:outline-none' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Fabricante</label>
                        <SingleSelect options={[]} name='Fabricante' placeholder='Selecciona un fabricante...' onChange={() => { }} />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Régimen Tributario</label>
                        <SingleSelect options={[]} name='Categoría' placeholder='Selecciona un régimen...' onChange={() => { }} />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Sustituto (Opcional)</label>
                        <input className='w-full border-b-2 border-black mb-4 pb-4 focus:outline-none' type="text" />
                    </div>
                    <div className="grid col-span-4 gap-2">
                        <label className='w-full' htmlFor="name">Porcentaje de Comisión</label>
                        <PercentageInput
                            id="ganancia"
                            name="ganancia"
                            placeholder="0"
                            value={ganancia}
                            onChange={handleGananciaChange}
                        />
                    </div>
                    <div className="grid col-span-4"></div>
                    <div className="grid col-span-12 grid-cols-12">
                        <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-300 items-center justify-center p-2">
                            <span className="grid col-span-2">- ¿Este producto se requiere fórmula medica?</span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl uppercase' htmlFor="requiresFormula_si">si</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="requiresFormula_si" name="requiresFormula" value="si" checked={requiresFormula === 'si'} onChange={handleRequiresFormulaChange} />
                            </span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl uppercase' htmlFor="requiresFormula_no">no</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="requiresFormula_no" name="requiresFormula" value="no" checked={requiresFormula === 'no'} onChange={handleRequiresFormulaChange} />
                            </span>
                        </div>
                        <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-300 items-center justify-center p-2">
                            <span className="grid col-span-2">- ¿Maneja inventario?</span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl uppercase' htmlFor="managesInventory_si">si</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="managesInventory_si" name="managesInventory" value="si" checked={managesInventory === 'si'} onChange={handleManagesInventoryChange} />
                            </span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl uppercase' htmlFor="managesInventory_no">no</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="managesInventory_no" name="managesInventory" value="no" checked={managesInventory === 'no'} onChange={handleManagesInventoryChange} />
                            </span>
                        </div>
                        <div className="grid grid-cols-2 col-span-4 text-center border-2 border-slate-300 items-center justify-center p-2">
                            <span className="grid col-span-2">- ¿Maneja vencimiento?</span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl uppercase' htmlFor="managesExpiration_si">si</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="managesExpiration_si" name="managesExpiration" value="si" checked={managesExpiration === 'si'} onChange={handleManagesExpirationChange} />
                            </span>
                            <span className='h-10 items-center text-center flex justify-center'>
                                <label className='m-2 py-2 text-2xl +' htmlFor="managesExpiration_no">no</label>
                                <input className='m-2 py-2 size-5 focus:outline-none h-8 pb-2' type="radio" id="managesExpiration_no" name="managesExpiration" value="no" checked={managesExpiration === 'no'} onChange={handleManagesExpirationChange} />
                            </span>
                        </div>
                        <div className="grid col-start-4 col-span-6 grid-cols-8 items-center justify-center p-2 w-full">
                            <span className="w-full grid col-span-7 text-center">
                                Ubicación Punto de Venta
                                <SingleSelect options={[]} name='Ubicación' placeholder='Selecciona la úbicación del punto de venta...' onChange={() => { }} />
                            </span>
                            <button className='mx-1 grid col-span-1 h-full p-2 bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center w-fit align-middle items-center shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold my-2'>+</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 w-9/12 gap-4 border-b-2 border-gray-300 pb-4">
                    <label className='col-span-4 col-start-5' htmlFor="">Precio medio compra</label>
                    <input className='col-span-4 col-start-5 border-b-2 border-black h-8 pb-5 focus:outline-none' disabled type="text" />
                    <label className='col-span-4 col-start-5' htmlFor="">Último precio compra</label>
                    <input className='col-span-4 col-start-5 border-b-2 border-black h-8 pb-5 focus:outline-none' type="text" />
                </div>

                <div className="grid grid-cols-12 w-9/12 gap-4">
                    <span className='col-span-12'>Prestaciónes, Contenido y Precios de Venta</span>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">General</h2>
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2 h-8 pb-2' htmlFor="">Presentación
                                    <select className='w-full h-8 pb-2' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% utilidad Deseado
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">- Precio de Venta
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% de utilidad Real.
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">Intermedio</h2>
                        <label id="check">
                            <input type="checkbox" name="" id="" defaultValue="false" />
                            <span className='check'></span>
                            <span className='text usar'>Usar</span>
                            <span className='text no-usar'>No Usar</span>
                        </label>
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2' htmlFor="">Presentación
                                    <select className='w-full h-8 pb-2' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2'>
                                    % utilidad Deseado
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2'>
                                    - Precio de Venta
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2'>
                                    % de utilidad Real.
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-slate-400 rounded-lg col-span-12 p-4 flex justify-center flex-col gap-4">
                        <h2 className="w-full text-center text-indigo-700 font-semibold text-2xl">Mínima</h2>
                        <label id="check" >
                            <input type="checkbox" defaultValue="true" name="" id="" />
                            <span className='check'></span>
                            <span className='text usar'>Usar</span>
                            <span className='text no-usar'>No Usar</span>
                        </label>
                        <div className='col-span-12 p-4 flex flex-col gap-4'>
                            <div className='grid grid-cols-12 gap-2'>
                                <label className='col-span-2' htmlFor="">Presentación
                                    <select className='w-full h-8 pb-2' name="" id="">
                                        <option value="">Unidad</option>
                                        <option value="">Sobre</option>
                                        <option value="">Caja</option>
                                    </select>
                                </label>
                                <label className='col-span-4' htmlFor="">Contenido interno, número de unidades
                                    <input className='w-full focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% utilidad Deseado
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">- Precio de Venta
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
                                </label>
                                <label className='col-span-2' htmlFor="">% de utilidad Real.
                                    <input className='w-full col-span-2 focus:outline-none h-8 pb-2' type="text" />
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