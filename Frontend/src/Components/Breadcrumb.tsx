import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const pathTranslations: { [key: string]: string } = {
  compras: 'Compras',
  ventas: 'Ventas',
  cajas: 'Cajas',
  inventarios: 'Inventarios',
  facturas: 'Facturas',
  configuracion: 'Configuración',
  // Sub-routes
  gestion: 'Gestión',
  gastos: 'Salidas de Caja',
  productos: 'Gestión de Productos',
  informe: 'Información de Inventario',
  precios: 'Actualizar Precios',
  clientes: 'Clientes y Proveedores',
  empleados: 'Empleados y Permisos',
  ubicaciones: 'Ubicación de Productos',
  // Action views
  agregar: 'Agregar Usuario',
  'agregar-rol': 'Agregar Rol',
  editar: 'Editar',
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getTranslatedPath = (path: string) => {
    // Attempt to find a direct translation first
    if (pathTranslations[path]) {
      return pathTranslations[path];
    }
    // Handle camelCase by splitting and capitalizing
    const words = path.replace(/([A-Z])/g, ' $1').split(' ');
    const translated = words.map(word => pathTranslations[word.toLowerCase()] || word).join(' ');
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };
  
  return (
    <nav className="flex items-center text-sm text-gray-500 bg-gray-100/50 px-4 py-2 rounded-lg border border-gray-200" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Link>
        </li>
        {pathnames.map((value, index) => {
          // Don't show numeric IDs in the breadcrumb trail
          if (!isNaN(parseInt(value, 10))) {
            return null;
          }
          
          const isLast = index === pathnames.length - 1;
          // Check if the next part of the path is a numeric ID, if so, this is the last visible item
          const nextValueIsId = !isLast && !isNaN(parseInt(pathnames[index + 1], 10));
          const lastVisible = isLast || nextValueIsId;

          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const translatedValue = getTranslatedPath(value);

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400" />
                {lastVisible ? (
                  <span className="ml-1 font-bold text-gray-800 md:ml-2">
                    {translatedValue}
                  </span>
                ) : (
                  <Link to={to} className="ml-1 font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                    {translatedValue}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
