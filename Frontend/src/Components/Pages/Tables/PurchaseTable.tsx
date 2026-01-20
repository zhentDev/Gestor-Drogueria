import { Printer, RefreshCw } from "lucide-react"; // Iconos modernos

// --- INTERFACE (copied from Facturas.tsx for now) ---
interface Purchase {
  id: string;
  FECHA: string;
  CONSECUTIVO: string;
  DOCTERCERO: string;
  NOMTERCERO: string;
  TIPOTRANSACCION: string;
  TOTAL: number;
}

const PurchaseTable = ({ data }: { data: Purchase[] }) => {
  // Función para formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="w-full text-left text-sm border-collapse bg-white">
        <thead className="bg-gray-100 text-gray-600 uppercase text-[11px] font-bold">
          <tr>
            <th className="p-3 border-b">Fecha</th>
            <th className="p-3 border-b">Número</th>
            <th className="p-3 border-b">Documento</th>
            <th className="p-3 border-b">R. Social</th>
            <th className="p-3 border-b">Tipo Trans</th>
            <th className="p-3 border-b">Total</th>
            <th className="p-3 border-b text-center">Imprimir</th>
            <th className="p-3 border-b text-center">Devolución</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item: Purchase, index: number) => (
            <tr key={index} className="hover:bg-blue-50 transition-colors">
              <td className="p-3 font-mono text-xs text-gray-500">
                {item.FECHA}
              </td>
              <td className="p-3 font-medium">{item.CONSECUTIVO}</td>
              <td className="p-3 text-gray-600">{item.DOCTERCERO}</td>
              <td className="p-3 font-semibold uppercase">{item.NOMTERCERO}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.TIPOTRANSACCION.includes("REMISION")
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.TIPOTRANSACCION}
                </span>
              </td>
              <td className="p-3 font-bold text-blue-700">
                {formatCurrency(item.TOTAL)}
              </td>
              <td className="p-3">
                <div className="flex justify-center">
                  <button
                    className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => console.log("Imprimir ID:", item.id)}
                  >
                    <Printer size={14} />
                  </button>
                </div>
              </td>
              <td className="p-3">
                <div className="flex justify-center">
                  <button
                    className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                    onClick={() => console.log("Devolución objeto:", item)}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;
