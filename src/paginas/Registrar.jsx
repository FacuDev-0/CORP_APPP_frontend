import { Link } from "react-router-dom"
import { useState } from "react"
import clienteURL from "../config/axiosURL"
import Alerta from "../components/notifications_compos/Alerta"

const Registrar = () => {
    // Datos del formulario
    const [datos, setDatos] = useState({
        name:'',
        second_name:'',
        last_name:'',
        second_last_name:'',
        age:'',
        document:'',
        password:'',
        confirm_password:'',
    })
    const [alerta, setAlerta] = useState('')
    const msg = alerta

    // Enviar formulario a la API
    const handleSubmit = async e =>{
        e.preventDefault()
        const {name,last_name,age,document,password,confirm_password} = datos

        // Verificar que los campos OBLIGATORIOS esten llenos
        if([name,last_name,age,document,password,confirm_password].includes('')){
            setAlerta({
                msg: 'Hay campos vacios',
                error:true
            })
            return
        }
        // Verificar si los passwors coinciden
        if(password !== confirm_password){
            setAlerta({
                msg: 'Password no coinciden',
                error:true
            })
            return
        }
        // Enviar Datos a la API
        await clienteURL.post('/registrarUsuario', datos)
            .then(response => setAlerta({
                msg:response.data.msg + ' - Inicie Sesion'
            }))
            .catch(error => setAlerta({
                msg: error.response.data.msg,
                error: true
            }))
    }

  return (
    <>
        <div className="lg:pt-20 mb-5">
            <div className='h-auto w-fit m-auto rounded-xl shadow-lg hover:shadow-indigo-300 py-4'>
                <h1 className='w-full text-center text-3xl text-white font-semibold bg-indigo-500 rounded-t-xl py-2'>Registrate y Administa Tus Expedientes</h1>
                <p className='text-xl text-center text-indigo-500 my-5 p-3'>
                    La informacion proporcionada puede ser de alta sensibilidad.
                    Es obligacion de cada individuo preservar la integridad de los Datos.
                </p>
            </div>
        </div>
        
        <div className='w-full text-center m-auto p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
            <h1 className='text-center text-xl font-semibold text-indigo-400 uppercase'>Registrate</h1>
            <form className="flex flex-col gap-5 text-indigo-500 uppercase items-center justify-center"
            onSubmit={handleSubmit}
            >
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Nombre</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                        type='text' name='name' placeholder='name' 
                        onChange={e => setDatos({...datos, name: e.target.value})}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Segundo Nombre</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center' 
                        type='text' name='second_name' placeholder='second name'
                        onChange={e => setDatos({...datos, second_name: e.target.value})}
                        />
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Apellido</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                        type='text' name='last_name' placeholder='last name'
                        onChange={e => setDatos({...datos, last_name: e.target.value})}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Segundo Apellido</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center' 
                        type='text' name='second_last_name' placeholder='second last name'
                        onChange={e => setDatos({...datos, second_last_name: e.target.value})}
                        />
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Fecha de nacimiento</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                        type='date' name='age' 
                        onChange={e => setDatos({...datos, age: e.target.value})}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Documento</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                        type='number' name='document' placeholder='document'
                        onChange={e => setDatos({...datos, document: e.target.value})}
                        />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-3'>
                    <label className='mt-3'>Email@</label>
                    <input 
                    className='w-full rounded-md border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                    type='text' name='email' placeholder='correo@correo.com'
                    onChange={e => setDatos({...datos, email: e.target.value})}
                    />
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Password</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                        type='password' name='password' placeholder='password'
                        onChange={e => setDatos({...datos, password: e.target.value})}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Confirmar Password</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                        type='password' name='confirm_password' placeholder='confirmar password'
                        onChange={e => setDatos({...datos, confirm_password: e.target.value})}
                        />
                    </div>
                </div>

                {msg && Alerta(alerta)}

                <button className='w-full text-white text-center text-lg bg-indigo-400 rounded-md hover:bg-indigo-600 mt-1 py-1'>Registrarse</button>
            </form>

            <div className="flex flex-row justify-between mt-5">
                <Link to='/' className="text-ms hover:text-indigo-500">Iniciar Sesion</Link>
                <Link to='/olvidePassword' className="text-ms hover:text-indigo-500">Olvidaste tu Contraseña?</Link>
            </div>

        </div>
    </>
    
  )
}

export default Registrar