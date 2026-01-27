import { BsOpencollective } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { FcDataConfiguration } from "react-icons/fc";
import { FaWallet } from "react-icons/fa";
import { PATHS } from "./paths";

export const navBarLinks = [
  {
    id: 1,
    name: "Inicio",
    link: PATHS.HOME,
    icon: BsOpencollective,
  },
  {
    id: 2,
    name: "Compras",
    link: PATHS.COMPRAS,
    icon: FaWallet,
  },
  {
    id: 3,
    name: "Ventas",
    link: PATHS.VENTAS,
    icon: MdSell,
  },
  {
    id: 4,
    name: "Gestión Cajas",
    link: PATHS.CAJAS,
    icon: FaMoneyBillTransfer,
  },
  {
    id: 5,
    name: "Inventarios",
    link: PATHS.INVENTARIOS,
    icon: MdOutlineInventory,
  },
  {
    id: 6,
    name: "Facturas",
    link: PATHS.FACTURAS,
    icon: FaFileInvoiceDollar,
  },
  {
    id: 7,
    name: "Configuración",
    link: PATHS.CONFIGURACION,
    icon: FcDataConfiguration,
  },
];

export const subNavBarLinks = [
  {
    id: 8,
    name: "Inventarios/Productos",
    link: PATHS.INVENTARIOS_PRODUCTOS,
  },
  {
    id: 9,
    name: "Inventarios/Informe",
    link: PATHS.INVENTARIOS_INFORME,
  },
  {
    id: 10,
    name: "Inventarios/Masivos Precios Venta",
    link: PATHS.INVENTARIOS_PRECIOS,
  },
  {
    id: 11,
    name: "Caja/Gestión",
    link: PATHS.CAJAS_GESTION,
  },
  {
    id: 12,
    name: "Caja/Salida de Caja",
    link: PATHS.CAJAS_GASTOS,
  },
  {
    id: 13,
    name: "Configuracion/Clientes",
    link: PATHS.CONFIGURACION_CLIENTES,
  },
  {
    id: 14,
    name: "Configuracion/Permisos",
    link: PATHS.CONFIGURACION_EMPLEADOS,
  },
  {
    id: 15,
    name: "Configuracion/Cajas",
    link: PATHS.CONFIGURACION_CAJAS,
  },
  {
    id: 16,
    name: "Configuracion/Ubicaciones",
    link: PATHS.CONFIGURACION_UBICACIONES,
  },
];
