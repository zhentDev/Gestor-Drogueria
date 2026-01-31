import ButtonPage from "../ButtonPage";
import { ClipboardList, BarChart3, FileUp } from "lucide-react";

function Inventarios() {
    return (
        <div className="flex justify-center items-start h-full w-full p-4">
            <div className="flex flex-row flex-wrap gap-6 justify-center w-full">
                <ButtonPage 
                    title="Gestión de Productos/Maestra" 
                    description="Visualizar toda su biblioteca de productos, cantidades, información, crear, editar, saldos, cargue inicial y eliminación" 
                    linkPage="/maestraProd"
                    icon={<ClipboardList size={48} strokeWidth={1.5} />} 
                />
                <ButtonPage 
                    title="Informe de inventarios" 
                    description="Conozca sus existencias de producto y el valor total a precio de compra de su inventario" 
                    linkPage="/viewinfoinventario"
                    icon={<BarChart3 size={48} strokeWidth={1.5} />}
                />
                <ButtonPage 
                    title="Actualizar precios de venta por archivo excel" 
                    description="Descargue un archivo en formato excel de sus productos con las presentaciones activas y sus precios de venta, para actualizar" 
                    linkPage="/masivoPreciosVenta"
                    icon={<FileUp size={48} strokeWidth={1.5} />}
                />
            </div>
        </div>
    )
}

export default Inventarios;