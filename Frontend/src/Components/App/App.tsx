import "./App.css";
import NavBar from "../NavBar";
import Login from "../Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [user, setUser] = useState<User>({
    id: null,
    name: null,
    permissions: null,
  });
  // const [password, setPassword] = useState('');
  // const [erroMessage, setErroMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirigir a la página de login
  };

  const handleLogOut = () => {
    setUser({ id: null, name: null, permissions: null, roles: null });
    localStorage.removeItem("authToken"); // Limpiar el token al cerrar sesión
    navigate("/");
  };

  // console.log(user);

  return (
    <div className="overflow-x-hidden flex flex-col h-screen gap-3 justify-between items-center select-none">
      {user.name ? (
        <Navigation textButton="Logout" functionButton={handleLogOut} />
      ) : (
        <Navigation textButton="Login" functionButton={handleLogin} />
      )}

      <Routes>
        <Route
          index
          element={
            <div className="h-screen w-screen flex justify-center items-center">
              Inicio login
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user.name} redirectTo="/login" />}>
          <Route path="/viewPedidos" element={<Compras />}></Route>
          <Route path="/viewFacturacionHor" element={<Ventas />}></Route>
          <Route path="/menuCajas" element={<GestionCajas />}></Route>
          <Route path="/viewGestionCajas" element={<GestionDeCaja />}></Route>
          <Route path="/viewGastos" element={<SalidasDeCaja />}></Route>
          <Route path="/viewInventarios" element={<Inventarios />}></Route>
          <Route path="/maestraProd" element={<GestionDeProductos />}></Route>
          <Route
            path="/viewinfoinventario"
            element={<InformacionInventario />}
          ></Route>
          <Route
            path="/masivoPreciosVenta"
            element={<ActualizarPreciosVenta />}
          ></Route>
          {/* Agrupando rutas de configuración bajo un solo ProotectedRoute */}
          <Route
            path="/menuConfiguracion"
            element={<Configuracion />}
          />
          <Route
            path="/viewClientes"
            element={<ClientesProveedores />}
          />
          <Route
            path="/viewPermisos"
            element={<EmpleadosPermisos />}
          />
          <Route
            path="/viewConfiguracionCajas"
            element={<ConfiguracionCajas />}
          />
          <Route
            path="/viewUbicaciones"
            element={<UbicacionProductos />}
          />
        </Route>
        <Route
          path="/viewListFactura"
          element={
            <ProtectedRoute
              redirectTo="/login"
              isAllowed={!!user.name}
            >
              <Facturas />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}


function Navigation({ textButton, functionButton }: NavBarProps) {
  return <NavBar textButton={textButton} functionButton={functionButton} />;
}

export default App;
