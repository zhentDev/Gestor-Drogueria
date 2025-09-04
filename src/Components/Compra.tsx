import { Link } from 'react-router-dom';

function Compras() {

    const date = new Date();
    return (
        <div className='h-screen w-8/12 flex flex-col justify-center items-center'>
            <main className="w-full">
                <ol className='flex items-center p-3 w-full m-3 justify-between'>
                    <div className="flex gap-2">
                        <li className='justify-start items-start'><Link to="/">Escritorio/</Link></li>
                        <li className=''><Link to="/viewPedidos">Compras</Link></li>
                    </div>
                    <li className='justify-end items-end'>{date.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                    )}</li>
                </ol>
            </main>
            <div className="h-5/6 w-full flex flex-col justify-between items-center p-0 m-0 shadow-md rounded-lg border border-gray-200">
                <section className="h-1/6 my-0 px-5 flex w-full items-center justify-between">
                    <div>
                        <span className="text-primary font-bold w-30 mr-1">Comprador actual:</span>
                        <span className='font-bold w-13 pl-1'>LAURA BEATRIZ-GOMEZ SANDOVAL *User*</span>
                    </div>
                    <div className="flex gap-5 justify-between">
                        <button className='bg-slate-300 border-indigo-800 rounded-xl px-2 py-1 text-center h-full align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold'>Crear Proveedor</button>
                        <button className='bg-slate-300 border-indigo-800 rounded-xl px-2 py-1 text-center h-full align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold'>Crear Producto</button>
                        <button className='bg-secondary border-indigo-800 rounded-xl px-2 py-1 text-center h-full align-middle shadow-md shadow-emerald-600 border-opacity-30 border-2 hover:border-opacity-0 hover:brightness-110 font-semibold'>Eliminar compra Actual</button>
                    </div>
                </section>
                <section className='w-11/12 border border-b-red-950 h-1 text-center m-0 p-0'></section>
                <section className="h-5/6 p-5 w-11/12 border border-black">
                    <div className="overflow-x-auto flex justify-between w-full">
                        <search className='flex gap-3 mb-5'>
                            <div className="max-w-60">
                                <input type="search" about='search' className="block p-2 pl-10 w-80 text-sm " placeholder="Buscar..." />
                                <optgroup>
                                    <option value="">
                                        Mostrar resultados preliminares*
                                    </option>
                                </optgroup>
                            </div>
                            <button className='bg-slate-300 border-indigo-800 rounded-xl px-2 py-1 text-center align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold h-20'>
                                buscar* Icono
                            </button>
                            <label htmlFor="search">Seleccionar producto IVA %</label>
                        </search>
                        <div className="mb-5 flex justify-between flex-col max-w-48">
                            <label htmlFor="" className='m-2'>tipo compra</label>
                            <select className='border-b border-gray-600 p-3'>
                                <option value="">Factura compra</option>
                                <option value="">Factura electronica compra</option>
                                <option value="">Remisión compra</option>
                                <option value="">Factura pos compra</option>
                            </select>
                        </div>
                    </div>
                    <section className=''>
                        <span>Compra:</span>
                        <label htmlFor="">
                            <input type="radio" className='' />
                            Más Iva
                        </label>
                        <label htmlFor="">
                            <input type="radio" className='' />
                            Iva incluido
                        </label>
                    </section>
                    <section className=''>
                        <label htmlFor="">
                            <input type="radio" className='' />
                            Sin Lote
                        </label>
                        <label htmlFor="">
                            <input type="radio" className='' />
                            Con lote
                        </label>

                        <table>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Descuento %</th>
                                    <th>IVA %</th>
                                    <th>Valor IVA</th>
                                    <th>Valor Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>Producto A</td>
                                    <td>10</td>
                                    <td>$5.00</td>
                                    <td>0%</td>
                                    <td>19%</td>
                                    <td>$9.50</td>
                                    <td>$59.50</td>
                                    <td>
                                        <button className='bg-red-500 text-white px-2 py-1 rounded'>Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>


                </section>
                <section className=''>
                    <table>
                        <tbody>
                            <tr>
                                <td>Subtotal:</td>
                            </tr>
                            <tr>
                                <td>IVA:</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div >
        </div >
    )
}

export default Compras