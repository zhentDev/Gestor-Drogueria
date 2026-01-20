import React from "react";
import { Printer, FileText, BarChart } from "lucide-react";

const SalesTable = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden border rounded-lg">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-600 uppercase text-[11px] font-bold">
          <tr>
            <th className="p-3 border-b">Fecha</th>
            <th className="p-3 border-b">Número</th>
            <th className="p-3 border-b">Documento</th>
            <th className="p-3 border-b">R. Social</th>
            <th className="p-3 border-b">Tipo Trans</th>
            <th className="p-3 border-b">Total</th>
            <th className="p-3 border-b text-center">Acciones</th>
            <th className="p-3 border-b text-center">Medio pago</th>
            <th className="p-3 border-b text-center">Caja</th>
            <th className="p-3 border-b text-center">Empleado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((inv, index) => (
            <tr key={`${inv.id}-${index}`} className="hover:bg-blue-50 transition-colors">
              <td className="p-3 font-mono text-xs">{inv.fecha}</td>
              <td className="p-3">{inv.numero}</td>
              <td className="p-3">{inv.doc}</td>
              <td className="p-3 font-semibold">{inv.rSocial}</td>
              <td className="p-3 font-semibold">{inv.tipo}</td>
              <td className="p-3 text-blue-700 font-bold">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(inv.total)}
              </td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700" title="Imprimir">
                    <Printer size={14} />
                  </button>
                  <button className="p-1.5 bg-orange-500 text-white rounded hover:bg-orange-600" title="Devolución">
                    <FileText size={14} />
                  </button>
                  <button className="p-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50" title="Detalle">
                    <BarChart size={14} />
                  </button>
                </div>
              </td>
              <td className="p-3 font-semibold">
                <div>Efectivo: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(inv.total)}</div>
                <div>Tarjeta: $0</div>
                <div>Transferencia: $0</div>
              </td>
              <td className="p-3 text-center">CAJA 1</td>
              <td className="p-3 text-center capitalize">{inv.empleado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
