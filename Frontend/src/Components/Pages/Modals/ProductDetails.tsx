import React from 'react';

interface DetailsProductProps {
    isOpen: boolean;
    onClose: () => void;
}

const DetailsProduct: React.FC<DetailsProductProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center w-full h-auto'>
            <div className="bg-white rounded-lg p-8 w-7/12 flex flex-col items-center max-h-[80vh] overflow-y-auto gap-2">
                <h2 className="text-xl font-bold mb-4">*Nombre Producto</h2>
                <table className="w-11/12">
                    <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100">
                        <tr className="flex justify-between border-t-2">
                            <td className="uppercase pl-3 text-center w-full" colSpan={2}>DATOS PRODUCTO</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Categoria:</span>
                            </td>
                            <td className='mr-12'>
                                <span>ASEO</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Registro Invima:</span>
                            </td>
                            <td className='mr-12'>
                                <span>321568411</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Fabricante:</span>
                            </td>
                            <td className='mr-12'>
                                <span>N/A</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Iva:</span>
                            </td>
                            <td className='mr-12'>
                                <span>0%</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Comisión:</span>
                            </td>
                            <td className='mr-12'>
                                <span>0%</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Sustituto:</span>
                            </td>
                            <td className='mr-12'>
                                <span></span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Último precio Compra:</span>
                            </td>
                            <td className='mr-12'>
                                <span>321568411</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>¿Requiere fórmula médica?:</span>
                            </td>
                            <td className='mr-12'>
                                <span>NO</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Maneja Inventario:</span>
                            </td>
                            <td className='mr-12'>
                                <span>SI</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Maneja Vencimiento:</span>
                            </td>
                            <td className='mr-12'>
                                <span>SI</span>
                            </td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className='mr-12'>
                                <span>Ubicación Especifica:</span>
                            </td>
                            <td className='mr-12'>
                                <span></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="w-11/12">
                    <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100 mt-4">
                        <tr className="flex justify-between border-t-2">
                            <td className="uppercase pl-3 text-center w-full" colSpan={4}>PRESENTACIONES DE PRODUCTO</td>
                        </tr>
                    </thead>
                    <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100 mt-4">
                        <tr className="flex justify-between border-t-2">
                            <td className="uppercase pl-3 text-center w-full" colSpan={4}>PRES</td>
                            <td className="uppercase pl-3 text-center w-full" colSpan={4}>TIPO</td>
                            <td className="uppercase pl-3 text-center w-full" colSpan={4}>$.VENTA</td>
                            <td className="uppercase pl-3 text-center w-full" colSpan={4}>UNID</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex justify-between border-t-2">
                            <td className="w-1/4 text-center">CAJA</td>
                            <td className="w-1/4 text-center">global</td>
                            <td className="w-1/4 text-center">$18.000</td>
                            <td className="w-1/4 text-center">12</td>
                        </tr>
                        <tr className="flex justify-between border-t-2">
                            <td className="w-1/4 text-center">UNIDAD</td>
                            <td className="w-1/4 text-center">unidad</td>
                            <td className="w-1/4 text-center">$1.500</td>
                            <td className="w-1/4 text-center">1</td>
                        </tr>
                    </tbody>
                </table>
                <table className="w-11/12">
                    <thead className="font-bold bg-slate-600 p-1 px-3 text-start text-slate-100 mt-4">
                        <tr className="flex justify-between border-t-2">
                            <td className="uppercase pl-3 text-center w-full">CÓDIGOS DE BARRAS</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex justify-center">
                            <td className="text-center">900123456 - Cód Principal</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetailsProduct;