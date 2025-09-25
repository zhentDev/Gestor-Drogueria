import ButtonPage from "../ButtonPage"

function GestionCajas() {
    return (
        <div className="flex justify-center items-start h-full w-full m-6 gap-1">
            <div className="flex h-fit my-2 w-full">
                <ButtonPage title="Apertura y cierre de cajas" description="Registre el valor de inicio del día o turno" linkPage="/viewGestionCajas" />
                <ButtonPage title="Salidas de caja" description="Registre los dineros tomados durante una apertura de caja" linkPage="/viewGastos" />
            </div>
        </div>
    )
}

export default GestionCajas