import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import clienteURL from "../config/axiosURL"
import Alerta from "../components/notifications_compos/Alerta"
import useAuth from "../hooks/useAuth"

const Login = () => {

    const navigate = useNavigate()
    const {auth, setAuth} = useAuth()
    const [datos, setDatos] = useState({email:'',password:''})
    const [alerta, setAlerta] = useState()
    const msg = alerta

    useEffect(()=>{
        if(auth.token){
            navigate('/admin')
        }
    }, [auth])

    const handleSubmit = async e =>{
        e.preventDefault()
        // Validar que los campos no esten vacios
        if(Object.values(datos).includes('')){
            setAlerta({
                msg:'Hay Campos Vacios',
                error:true
            })
            return
        }

        // Enviar Solicitud a la API
        await clienteURL.post('/', datos)
            .then(response => {
                setAuth(response.data.usuarioObj)
                setAlerta({
                    msg: 'Iniciando...'
                })
            })
            .catch(error => setAlerta({
                msg: error.response.data.msg,
                error:true
            }))
    }
  return (
    <>
        <div className=' h-auto w-fit m-auto rounded-xl shadow-lg hover:shadow-red-300 '>
            <h1 className='w-full text-center text-3xl text-white font-semibold uppercase bg-red-500 rounded-t-xl py-2'>Advertencia</h1>
            <p className='text-xl text-center text-red-500 my-5 p-3'>
                La informacion proporcionada es de alta sensibilidad.
                Es obligacion de cada individuo preservar la integridad de los Datos.
            </p>
        </div>
        <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
            <h1 className='text-center text-2xl font-bold text-indigo-400 uppercase'>Administrar Expedientes</h1>
            <form className="flex flex-col gap-5 uppercase items-center text-lg justify-center text-indigo-500"
            onSubmit={handleSubmit}
            >
                <div className='w-full flex flex-col justify-center items-center gap-3'>
                    <label className='mt-3'>Email@</label>
                    <input 
                    className='w-full rounded-md px-3 border-2  hover:border-red-300 text-center' 
                    type='text' name='email' placeholder='email@emiail.com'
                    onChange={e => setDatos({...datos, email: e.target.value})}
                    />
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-3'>
                    <label className='mt-3'>Pssword</label>
                    <input 
                    className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center' 
                    type='password' name='password' placeholder='Contraseña'
                    onChange={e => setDatos({...datos, password: e.target.value})}
                    />
                </div>
                
                {msg && Alerta(alerta)}

                <button className='w-3/4 text-white text-center bg-indigo-400 rounded-md hover:bg-indigo-600 mt-3 py-1'>Iniciar</button>
            </form>

            <div className="flex flex-row justify-between mt-5">
                <Link to='/registrar' className="text-ms hover:text-indigo-500">No te has reguistrado? Reguistrate Aqui</Link>
                <Link to='/olvidePassword' className="text-ms hover:text-indigo-500">Olvidaste tu Contraseña?</Link>
            </div>

        </div>
    </>
  )
}

export default Login