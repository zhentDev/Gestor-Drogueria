import ButtonPage from "../ButtonPage"

function Inventarios() {
    return (
        <div className="flex justify-center items-start h-full w-full m-6 gap-1">
            <div className="flex h-fit my-2 w-full">
                <ButtonPage title="Gestión de Productos/Maestra" description="Visualizar toda su biblioteca de productos, cantidades, información, crear, editar, saldos, cargue inicial y eliminación" linkPage="/maestraProd" />
                <ButtonPage title="Informe de inventarios" description="Conozco sus existencias de prodcuto y el valor total a precio de compra de su invetario" linkPage="/viewinfoinventario" />
                <ButtonPage title="Actualizar precios de venta por archivo excel" description="Descargue un archivo en formato excel de sus productos con las presentaciones activas y sus precios de venta, para actualizar" linkPage="/masivoPreciosVenta" />
            </div>
        </div>
    )
}

export default Inventarios