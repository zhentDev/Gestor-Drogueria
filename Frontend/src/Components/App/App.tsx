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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ¡IMPORTANTE! Usa el usuario y contraseña que configuraste en tu backend.
        body: JSON.stringify({
          username: "admin",
          password: "admin123", // Reemplaza con tu contraseña real
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (!response.ok || !data.success) {
        // Si la respuesta no es exitosa, muestra el error y no hagas nada.
        console.error(
          "Error de login:",
          data.message || "Credenciales incorrectas"
        );
        alert(`Error de login: ${data.message || "Credenciales incorrectas"}`);
        return;
      }

      // La respuesta del backend debería tener un formato como { success: true, data: { user: {...}, token: '...' } }
      const loggedInUser = data.data.user;

      // Actualizamos el estado del usuario con los datos del backend
      setUser({
        id: loggedInUser.id,
        name: loggedInUser.full_name, // Asumiendo que el nombre completo viene en 'full_name'
        permissions: loggedInUser.permissions || [], // Asegúrate de que tu backend devuelva esto
        roles: [loggedInUser.role], // Asumiendo que el rol viene en 'role'
      });

      // Opcional: guardar el token en localStorage para futuras peticiones
      localStorage.setItem("authToken", data.data.token);
    } catch (error) {
      console.error("Fallo la conexión con el servidor:", error);
      alert(
        "No se pudo conectar con el servidor. Revisa la consola para más detalles."
      );
    }
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
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user.name} />}>
          <Route path="/viewPedidos" element={<Compras />}></Route>
          <Route path="/viewFacturacionHor" element={<Ventas />}></Route>
          <Route path="/menuCajas" element={<GestionCajas />}></Route>
          <Route path="/viewGestionCajas" element={<GestionDeCaja />}></Route>
          <Route path="/viewGastos" element={<SalidasDeCaja />}></Route>
          <Route path="/viewInventarios" element={<Inventarios />}></Route>
          <Route path="/maestraProd" element={<GestionDeProductos />}></Route>
          <Route path="/viewinfoinventario" element={<></>}></Route>
          <Route path="/masivoPreciosVenta" element={<></>}></Route>
        </Route>
        <Route
          path="/viewListFactura"
          element={
            <ProtectedRoute
              isAllowed={
                !!user.name && user.permissions?.includes("admin")
                  ? true
                  : false
              }
              redirectTo="/"
            >
              <></>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/confView"
          element={
            <ProtectedRoute
              isAllowed={
                !!user.name && user.roles?.includes("admin") ? true : false
              }
              redirectTo="/"
            >
              <></>
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
