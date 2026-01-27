import "./App.css";
import NavBar from "../NavBar";
import Login from "../Login/Login";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProtectedRoute } from "../ProtectedRoute";
import Compras from "../Pages/Compras";
import Ventas from "../Pages/Ventas";
import GestionCajas from "../Pages/GestionCajas";
import GestionDeCaja from "../Pages/SubPages/GestionDeCaja";
import SalidasDeCaja from "../Pages/SubPages/SalidasDeCaja";
import Inventarios from "../Pages/Inventarios";
import GestionDeProductos from "../Pages/SubPages/GestionDeProductos";
import InformacionInventario from "../Pages/SubPages/InformacionInventario";
import ActualizarPreciosVenta from "../Pages/SubPages/ActualizarPreciosVenta";
import Facturas from "../Pages/Facturas";
import Configuracion from "../Pages/Configuracion";
import ClientesProveedores from "../Pages/SubPages/Configuracion/ClientesProveedores";
import EmpleadosPermisos from "../Pages/SubPages/Configuracion/EmpleadosPermisos";
import ConfiguracionCajas from "../Pages/SubPages/Configuracion/ConfiguracionCajas";
import UbicacionProductos from "../Pages/SubPages/Configuracion/UbicacionProductos";
import Roles from "../Pages/SubPages/Configuracion/Roles";
import Breadcrumb from "../Breadcrumb";
import { PATHS } from "../../Data/paths";

export interface User {
  id: number | null;
  name: string | null;
  permissions: string[] | null;
  roles?: string[] | null;
}

interface NavBarProps {
  textButton: string;
  functionButton: () => void;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            const loggedInUser = data.data;
            setUser({
              id: loggedInUser.id,
              name: loggedInUser.full_name,
              permissions: loggedInUser.permissions || [],
              roles: [loggedInUser.role],
            });
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error('Failed to fetch profile', error);
        }
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, []);

  const handleLogin = () => {
    navigate(PATHS.LOGIN);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate(PATHS.HOME);
  };

  if (loadingProfile) {
    return <div className="h-screen w-screen flex justify-center items-center">Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {location.pathname !== PATHS.LOGIN && (
        user ? (
          <Navigation textButton="Logout" functionButton={handleLogOut} />
        ) : (
          <Navigation textButton="Login" functionButton={handleLogin} />
        )
      )}

      <main className="flex-grow w-full">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4">
          {location.pathname !== PATHS.LOGIN && <Breadcrumb />}
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <Routes>
            <Route
              index
              element={
                <div className="h-full flex justify-center items-center">
                  Inicio (Página principal pública o dashboard si está logueado)
                </div>
              }
            />
            <Route path={PATHS.LOGIN} element={<Login setUser={setUser} />} />

            {/* Redirects from old paths to new paths */}
            <Route path="/viewPedidos" element={<Navigate to={PATHS.COMPRAS} replace />} />
            <Route path="/viewFacturacionHor" element={<Navigate to={PATHS.VENTAS} replace />} />
            <Route path="/menuCajas" element={<Navigate to={PATHS.CAJAS} replace />} />
            <Route path="/viewInventarios" element={<Navigate to={PATHS.INVENTARIOS} replace />} />
            <Route path="/viewListFactura" element={<Navigate to={PATHS.FACTURAS} replace />} />
            <Route path="/menuConfiguracion" element={<Navigate to={PATHS.CONFIGURACION} replace />} />
            <Route path="/maestraProd" element={<Navigate to={PATHS.INVENTARIOS_PRODUCTOS} replace />} />
            <Route path="/viewinfoinventario" element={<Navigate to={PATHS.INVENTARIOS_INFORME} replace />} />
            <Route path="/masivoPreciosVenta" element={<Navigate to={PATHS.INVENTARIOS_PRECIOS} replace />} />
            <Route path="/viewGestionCajas" element={<Navigate to={PATHS.CAJAS_GESTION} replace />} />
            <Route path="/viewGastos" element={<Navigate to={PATHS.CAJAS_GASTOS} replace />} />
            <Route path="/viewClientes" element={<Navigate to={PATHS.CONFIGURACION_CLIENTES} replace />} />
            <Route path="/viewPermisos" element={<Navigate to={PATHS.CONFIGURACION_EMPLEADOS} replace />} />
            <Route path="/viewConfiguracionCajas" element={<Navigate to={PATHS.CONFIGURACION_CAJAS} replace />} />
            <Route path="/viewUbicaciones" element={<Navigate to={PATHS.CONFIGURACION_UBICACIONES} replace />} />

            <Route element={<ProtectedRoute isAllowed={!!user} redirectTo={PATHS.LOGIN} />}>
              <Route path={PATHS.COMPRAS} element={<Compras />} />
              <Route path={PATHS.VENTAS} element={<Ventas />} />
              <Route path={PATHS.CAJAS} element={<GestionCajas />} />
              <Route path={PATHS.INVENTARIOS} element={<Inventarios />} />
              <Route path={PATHS.FACTURAS} element={<Facturas />} />
              <Route path={PATHS.CONFIGURACION} element={<Configuracion />} />
              <Route path={PATHS.CAJAS_GESTION} element={<GestionDeCaja />} />
              <Route path={PATHS.CAJAS_GASTOS} element={<SalidasDeCaja />} />
              <Route path={PATHS.INVENTARIOS_PRODUCTOS} element={<GestionDeProductos />} />
              <Route path={PATHS.INVENTARIOS_INFORME} element={<InformacionInventario />} />
              <Route path={PATHS.INVENTARIOS_PRECIOS} element={<ActualizarPreciosVenta />} />
              <Route path={PATHS.CONFIGURACION_CLIENTES} element={<ClientesProveedores />} />
              <Route path={`${PATHS.CONFIGURACION_EMPLEADOS}/*`} element={<EmpleadosPermisos />} />
              <Route path={`${PATHS.CONFIGURACION_ROLES}/*`} element={<Roles />} />
              <Route path={PATHS.CONFIGURACION_CAJAS} element={<ConfiguracionCajas />} />
              <Route path={PATHS.CONFIGURACION_UBICACIONES} element={<UbicacionProductos />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Navigation({ textButton, functionButton }: NavBarProps) {
  return <NavBar textButton={textButton} functionButton={functionButton} />;
}

export default App;
