import { BsOpencollective } from 'react-icons/bs';
import { MdSell } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdOutlineInventory } from 'react-icons/md';
import { FcDataConfiguration } from 'react-icons/fc';
import { FaWallet } from 'react-icons/fa';

export const navBarLinks = [
    {
        id: 1,
        name: "Inicio",
        link: "/",
        icon: BsOpencollective
    },
    {
        id: 2,
        name: "Compras",
        link: "/viewPedidos",
        icon: FaWallet
    },
    {
        id: 3,
        name: "Ventas",
        link: "/viewFacturacionHor",
        icon: MdSell
    },
    {
        id: 4,
        name: "Gestión Cajas",
        link: "/menuCajas",
        icon: FaMoneyBillTransfer
    },
    {
        id: 5,
        name: "Inventarios",
        link: "/viewInventarios",
        icon: MdOutlineInventory
    },
    {
        id: 6,
        name: "Facturas",
        link: "/viewListFactura",
        icon: FaFileInvoiceDollar
    },
    {
        id: 7,
        name: "Configuración",
        link: "/confView",
        icon: FcDataConfiguration
    },
]

export const subNavBarLinks = [
    {
        id: 8,
        name: "Inventarios/Productos",
        link: "/maestraProd"
    },
    {
        id: 9,
        name: "Inventarios/Informe",
        link: "/viewinfoinventario"
    },
    {
        id: 10,
        name: "Inventarios/Masivos Precios Venta",
        link: "/masivoPreciosVenta"
    },
    {
        id: 11,
        name: "Caja/Gestión",
        link: "/viewGestionCajas"
    },
    {
        id: 12,
        name: "Caja/Salida de Caja",
        link: "/viewGastos"
    },
]