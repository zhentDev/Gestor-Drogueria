import ButtonPage from "../ButtonPage"

function GestionCajas() {
    return (
        <div className="flex justify-center items-start h-full w-full m-6 gap-1">
            <ButtonPage title="Apertura y cierre de cajas" description="Registre el valor de inicio del día o turno" linkPage="/viewGestionCajas" />
            <ButtonPage title="Salidas de caja" description="Registre los dineros tomados durante una apertura de caja" linkPage="/viewGastos" />
        </div>
    )
}

export default GestionCajas