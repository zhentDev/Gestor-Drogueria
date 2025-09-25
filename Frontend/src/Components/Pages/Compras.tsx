import MainBanner from '../MainBanner';
import ProductTable from '../ProductTable';
import Search from '../Search';

function Compras() {
    return (
        <div className='h-screen w-10/12 flex flex-col justify-center items-center'>
            <MainBanner />
            <div className="h-5/6 w-full flex flex-col justify-between items-center p-0 m-0 shadow-md rounded-lg border border-gray-200 gap-2">
                <section className="h-1/6 my-0 px-5 flex w-full items-center justify-between">
                    <div className='flex gap-1 flex-col w-auto h-full justify-center'>
                        <span className="text-primary font-bold w-30 mr-1">Comprador actual:</span>
                        <span className='font-bold w-13 pl-1'>LAURA BEATRIZ-GOMEZ SANDOVAL *User*</span>
                    </div>
                    <div className="flex gap-5 justify-around mx-5 w-full max-w-max">
                        <button className='bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold'>Crear Proveedor</button>
                        <button className='bg-slate-300 border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-60 border-2 hover:border-opacity-0 hover:brightness-90 font-semibold'>Crear Producto</button>
                        <button className='bg-secondary border-indigo-800 rounded-xl px-4 py-1 text-center h-auto w-auto align-middle shadow-md shadow-emerald-600 border-opacity-30 border-2 hover:border-opacity-0 hover:brightness-110 font-semibold'>Eliminar compra Actual</button>
                    </div>
                </section>
                <section className='w-11/12 border border-b-red-950 h-1 text-center m-0 p-0'></section>
                <section className="h-4/6 p-5 w-11/12 border border-black flex flex-col justify-between gap-3 rounded-lg shadow-lg shadow-slate-400">
                    <div className="overflow-x-auto flex justify-between w-full">
                        <Search />
                        <div className="mb-5 flex justify-between flex-col max-w-56">
                            <label htmlFor="" className='m-2'>tipo compra</label>
                            <select className='border-b border-gray-600 p-3'>
                                <option value="">Factura compra</option>
                                <option value="">Factura electronica compra</option>
                                <option value="">Remisión compra</option>
                                <option value="">Factura pos compra</option>
                            </select>
                        </div>
                    </div>
                    <section className='flex justify-center items-center gap-2 w-full'>
                        <span>Compra:</span>
                        <label htmlFor="" className='px-2 py-1'>
                            <input type="radio" className='pr-1' />
                            <span className='pr-1 pl-2'>Más Iva</span>
                        </label>
                        <label htmlFor="" className='px-6 py-1'>
                            <input type="radio" className='pr-1' />
                            <span className='pr-1 pl-2'>Iva incluido</span>
                        </label>
                    </section>
                    <section className='flex flex-col justify-start items-center gap-2 w-full'>
                        <div className="block w-full text-center">
                            <label htmlFor="" className='px-4'>
                                <input type="radio" className='px-3' />
                                <span className='pr-1 pl-2'>Sin Lote</span>
                            </label>
                            <label htmlFor="" className='px-4'>
                                <input type="radio" className='px-3' />
                                <span className='pr-1 pl-2'>Con lote</span>
                            </label>
                        </div>

                        <div className="flex flex-row w-full gap-3 justify-between items-center px-3">
                            <table className='w-10/12'>
                                <thead>
                                    <tr>
                                        <th>Lote</th>
                                        <th>Mes</th>
                                        <th>Año</th>
                                        <th>Presentación</th>
                                        <th>Ubicación</th>
                                        <th>Precio Compra</th>
                                        <th>Cantidad</th>
                                        <th>Sub Total Producto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0000</td>
                                        <td><select name="lote" id="lote">{Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></td>
                                        <td>10</td>
                                        <td>$5.00</td>
                                        <td>0%</td>
                                        <td>19%</td>
                                        <td>$9.50</td>
                                        <td>$0</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='bg-blue-500 text-white px-2 py-1 rounded w-1/12'>+ Agregar</button>
                            <button className='bg-red-500 text-white px-2 py-1 rounded w-1/12'>Eliminar</button>
                        </div>
                    </section>
                </section>
                <ProductTable />
                <section className='flex flex-col justify-center items-center my-2 shadow-md rounded-lg border border-gray-200 gap-2 p-2'>
                    <span>Total: $999.99</span>
                    <span><button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded w-auto">Confirmar Envio</button></span>
                </section>
            </div >
        </div >
    )
}

export default Compras