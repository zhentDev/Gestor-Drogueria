import './App.css'
import NavBar from '../NavBar'
import Compras from '../Compra'
import Login from '../Login/Login'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProtectedRoute } from '../ProtectedRoute'

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
  const [user, setUser] = useState<User>({ id: null, name: null, permissions: null });
  // const [password, setPassword] = useState('');
  // const [erroMessage, setErroMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // request done
    setUser({
      id: 1,
      name: 'Laura',
      permissions: ['admin', 'leer', 'escribir'],
      roles: ['admin', 'vendedor']
    })
  }

  const handleLogOut = () => {
    setUser({ id: null, name: null, permissions: null });
    navigate('/');
  }

  // console.log(user);

  return (

    <div className="overflow-x-hidden flex flex-col h-screen gap-3 justify-between items-center">

      {
        user.name ? (
          <Navigation textButton='Logout' functionButton={handleLogOut} />
        )
          :
          (
            <Navigation textButton='Login' functionButton={handleLogin} />
          )
      }

      <Routes>
        <Route index element={<div className='h-screen w-screen flex justify-center items-center'>Inicio login</div>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user.name} />}>
          <Route path='/viewPedidos' element={<Compras />}></Route>
          <Route path='/viewFacturacionHor' element={<></>}></Route>
          <Route path='/menuCajas' element={<></>}></Route>
          <Route path='/viewInventarios' element={<></>}></Route>
        </Route>
        <Route path='/viewListFactura' element={
          <ProtectedRoute isAllowed={!!user.name && user.permissions?.includes("admin") ? true : false} redirectTo="/">
            <></>
          </ProtectedRoute>
        }>
        </Route>
        <Route path='/confView' element={
          <ProtectedRoute isAllowed={!!user.name && user.roles?.includes("admin") ? true : false} redirectTo="/">
            <></>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </div >
  )
}

function Navigation({ textButton, functionButton }: NavBarProps) {
  return (
    <NavBar textButton={textButton} functionButton={functionButton} />
  )
}

export default App
