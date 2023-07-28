import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarRegistro from './paginas/ConfirmarRegistro'
import OlvidePassword from './paginas/OlvidePassword'
import RecuperarPassword from './paginas/RecuperarPassword'
import AdministradorExpedientes from './paginas/AdministradorExpedientes'
import './App.css'
import { AuthProvider  } from './context/AuthProvider'


function App() {
  
  return (
      <BrowserRouter>
        <AuthProvider>
           <Routes>

            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login/>}/>
              <Route path="registrar" index element={<Registrar/>}/>
              <Route path="confirmar/:token" index element={<ConfirmarRegistro/>}/>
              <Route path="olvidePassword" index element={<OlvidePassword/>}/>
              <Route path="recuperarPassword/:token" index element={<RecuperarPassword/>}/>
            </Route>

            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministradorExpedientes/>}/>
            </Route>
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
