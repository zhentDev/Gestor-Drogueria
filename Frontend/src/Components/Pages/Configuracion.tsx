import { Users, UserCog, Archive, Package, ShieldCheck } from "lucide-react";
import ButtonPage from "../ButtonPage";
import { PATHS } from "../../Data/paths";

const Configuracion = () => {
  // Datos para los botones de la página de configuración
  const buttons = [
    {
      title: "Clientes/Proveedores",
      description: "Agregue y actualice sus proveedores y clientes.",
      linkPage: PATHS.CONFIGURACION_CLIENTES,
      icon: <Users size={48} strokeWidth={1.5} />,
    },
    {
      title: "Empleados",
      description: "Crear, actualizar, y gestionar usuarios.",
      linkPage: PATHS.CONFIGURACION_EMPLEADOS,
      icon: <UserCog size={48} strokeWidth={1.5} />,
    },
    {
      title: "Roles y Permisos",
      description: "Defina los roles y sus permisos en el sistema.",
      linkPage: PATHS.CONFIGURACION_ROLES,
      icon: <ShieldCheck size={48} strokeWidth={1.5} />,
    },
    {
      title: "Configuración de cajas",
      description: "Lista, modificación y creación de cajas.",
      linkPage: PATHS.CONFIGURACION_CAJAS,
      icon: <Archive size={48} strokeWidth={1.5} />,
    },
    {
      title: "Ubicación de productos",
      description: "Gestione las ubicaciones de los productos.",
      linkPage: PATHS.CONFIGURACION_UBICACIONES,
      icon: <Package size={48} strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center h-full w-full p-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"> */}
      <div className="flex flex-row flex-wrap gap-6 justify-center w-full">
        {buttons.map((button) => (
          <ButtonPage
            key={button.title}
            title={button.title}
            description={button.description}
            linkPage={button.linkPage}
            icon={button.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Configuracion;
