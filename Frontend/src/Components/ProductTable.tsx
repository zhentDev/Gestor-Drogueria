

// function ProductTable({ name, price, quantity, total, opc }: ProductTableProps ) {
function ProductTable() {
    return (
        <section className='w-full flex flex-col justify-between items-center gap-2 mt-3'>
            <table className='w-11/12'>
                <thead>
                    <tr>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>Producto</th>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>Pres</th>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>Cant</th>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>$V/unit</th>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>Total</th>
                        <th className='uppercase font-bold bg-slate-600 p-1 px-3 text-start text-slate-100'>OPC</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        false ? (
                            <tr>
                                <td className='bg-gray-200 text-center'>Producto</td>
                                <td className='bg-gray-200 text-center'>IVA:</td>
                                <td className='bg-gray-200 text-center'>Total:</td>
                                <td className='bg-gray-200 text-center'>Total:</td>
                                <td className='bg-gray-200 text-center'>Total:</td>
                                <td className='bg-gray-200 text-center'>Total:</td>
                            </tr>

                        ) : (
                            <tr className='bg-gray-200 text-center'>
                                <td className='text-center h-20' colSpan={6}>X No hay productos en el carrito</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default ProductTable