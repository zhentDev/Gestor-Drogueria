const Login: React.FC = () => {


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
                        <input
                            type="email"
                            placeholder="Usuario"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
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

                        <div className="mt-4">
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                                Ingresar
                            </button>
                            <p className="text-sm mt-4 text-center">
                                ¿Aun no tienes cuenta?{' '}
                                <a href="#!" className="text-red-500 font-semibold hover:underline">
                                    Registro
                                </a>
                            </p>
                        </div>
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