import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importar useLocation
import { User } from "../App/App"; // Importar la interfaz User desde App.tsx

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [tipo_doc, setTipoDoc] = useState("CC"); // Valor por defecto 'CC'
  const [num_doc, setNumDoc] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual

  const from = location.state?.from?.pathname || "/"; // Ruta a redirigir después del login

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo_doc, num_doc, password }), // Enviar tipo_doc y num_doc
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      const loggedInUser = data.data.user;
      setUser({
        id: loggedInUser.id,
        name: loggedInUser.full_name,
        permissions: loggedInUser.permissions || [],
        roles: [loggedInUser.role],
      });
      localStorage.setItem("authToken", data.data.accessToken); // Guardar Access Token
      localStorage.setItem("refreshToken", data.data.refreshToken); // Guardar Refresh Token

      navigate(from, { replace: true }); // Redirigir a la ruta original o home
    } catch (err: any) {
      setError(err.message || "Fallo la conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-5/6 min-w-full bg-gray-100 flex flex-col justify-between">
      <div className="container m-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center max-w-6xl m-auto">
          {/* Imagen */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample"
              className="w-full h-auto"
            />
          </div>

          {/* Formulario */}
          <div className="md:w-1/2 md:pl-10">
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tipo_doc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                  required
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="NIT">NIT</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PAS">Pasaporte (PAS)</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Número de Documento"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={num_doc}
                onChange={(e) => setNumDoc(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-between items-center mb-4 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Recordarme
                </label>
                <a href="#!" className="text-blue-600 hover:underline">
                  ¿Olvidaste la contraseña?
                </a>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                </button>
                <p className="text-sm mt-4 text-center">
                  ¿Aun no tienes cuenta?{" "}
                  <a
                    href="#!"
                    className="text-red-500 font-semibold hover:underline"
                  >
                    Registro
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">© 2020. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#!" className="text-white hover:text-gray-200">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white hover:text-gray-200">
            <i className="fab fa-twitter" />
          </a>
          <a href="#!" className="text-white hover:text-gray-200">
            <i className="fab fa-google" />
          </a>
          <a href="#!" className="text-white hover:text-gray-200">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;