import ButtonPage from "../ButtonPage";
import { Archive, MoveUpRight } from "lucide-react";

function GestionCajas() {
    return (
        <div className="flex justify-center items-start h-full w-full p-4">
            <div className="flex flex-row flex-wrap gap-6 justify-center w-full">
                <ButtonPage 
                    title="Apertura y cierre de cajas" 
                    description="Registre el valor de inicio del día o turno" 
                    linkPage="/viewGestionCajas"
                    icon={<Archive size={48} strokeWidth={1.5} />}
                />
                <ButtonPage 
                    title="Salidas de caja" 
                    description="Registre los dineros tomados durante una apertura de caja" 
                    linkPage="/viewGastos"
                    icon={<MoveUpRight size={48} strokeWidth={1.5} />}
                />
            </div>
        </div>
    )
}

export default GestionCajas;