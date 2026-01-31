import React from "react";
import { Printer, Send, AlertCircle } from "lucide-react";

// Definición de la interfaz para facturas pendientes de la DIAN
interface DianPendingInvoice {
  FECHA: string;
  CONSECUTIVO: string;
  DOCTERCERO: string;
  NOMTERCERO: string;
  TIPOTRANSACCION: string;
  TOTAL: number;
  ERROR_DETALLE: string;
  id: string;
}

interface DianPendingTableProps {
  data: DianPendingInvoice[];
}

const DianPendingTable: React.FC<DianPendingTableProps> = ({ data }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handlePrint = (id: string): void => {
    console.log(`Imprimiendo borrador DIAN: ${id}`);
  };

  const handleResendDian = (id: string): void => {
    console.log(`Reenviando factura ${id} a la DIAN...`);
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="custom-datatable w-full text-left text-sm bg-white">
        <thead className="bg-gray-50 text-gray-700 uppercase text-[10px] font-bold border-b border-gray-200">
          <tr>
            <th className="p-3 border-r">Fecha</th>
            <th className="p-3 border-r">Número</th>
            <th className="p-3 border-r">Documento</th>
            <th className="p-3 border-r">R. Social</th>
            <th className="p-3 border-r">Tipo Trans</th>
            <th className="p-3 border-r text-right">Total</th>
            <th className="p-3 border-r text-center">Imprimir</th>
            <th className="p-3 border-r text-center">Reenviar DIAN</th>
            <th className="p-3 text-center">Detalles del Error</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="even:bg-gray-50 hover:bg-red-50 transition-colors"
              >
                <td className="p-2 border-r border-t font-mono text-xs">
                  {item.FECHA}
                </td>
                <td className="p-2 border-r border-t">{item.CONSECUTIVO}</td>
                <td className="p-2 border-r border-t">{item.DOCTERCERO}</td>
                <td className="p-2 border-r border-t font-semibold">
                  {item.NOMTERCERO.toUpperCase()}
                </td>
                <td className="p-2 border-r border-t text-[10px]">
                  {item.TIPOTRANSACCION}
                </td>
                <td className="p-2 border-r border-t text-right font-bold">
                  {formatCurrency(item.TOTAL)}
                </td>
                <td className="p-2 border-r border-t">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handlePrint(item.id)}
                      className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      <Printer size={14} />
                    </button>
                  </div>
                </td>
                <td className="p-2 border-r border-t">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleResendDian(item.id)}
                      className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center gap-1 text-[10px] px-3"
                    >
                      <Send size={12} /> REENVIAR
                    </button>
                  </div>
                </td>
                <td className="p-2 border-t text-red-600 text-xs italic">
                  <div className="flex items-center gap-1 justify-center">
                    <AlertCircle size={14} />
                    <span
                      className="truncate max-w-[150px]"
                      title={item.ERROR_DETALLE}
                    >
                      {item.ERROR_DETALLE}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="p-12 text-center bg-gray-50">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <AlertCircle size={40} className="mb-2 opacity-20" />
                  <span className="text-sm font-medium">
                    Ningún dato disponible en esta tabla
                  </span>
                  <span className="text-xs">
                    Todas las facturas están al día con la DIAN
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DianPendingTable;
