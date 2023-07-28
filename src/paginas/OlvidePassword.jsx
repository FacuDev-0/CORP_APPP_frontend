import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Alerta from "../components/notifications_compos/Alerta"
import clienteURL from "../config/axiosURL"
const OlvidePassword = () => {

    const [email, setEmail] = useState({})
    const [alerta, setAlerta] = useState()
    const msg = alerta

    const handleSubmit = async e =>{
        e.preventDefault()
        if(email === '') return setAlerta({msg: 'Ingrese un Email', error: true})
        // Solicitar el envio de correo de verificacion a la API
        await clienteURL.post('/olvidePassword', email)
            .then(response => setAlerta({msg: response.data.msg}))
            .catch(error => setAlerta({msg: error.response.data.msg, error: true}))
    }
    
  return (
    <>
        <div className=' h-auto w-fit m-auto rounded-xl shadow-lg hover:shadow-orange-300 '>
            <h1 className='w-full text-center text-3xl text-white font-semibold bg-orange-400 rounded-t-xl py-2'>Recupera Tu Password</h1>
            <p className='text-xl text-center text-orange-400 my-5 p-3'>
                Proporsionanos tu EMAIL para confirmar tu identidad y preservar la sensibilidad de los datos almacenados. Te enviaremos un Email de confirmacion a tu correo.
            </p>
        </div> 
        <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
            <h1 className='text-center text-2xl font-bold text-indigo-400 uppercase'>Recupera Tu Cuenta</h1>
            <form className="flex flex-col gap-5 uppercase items-center text-xl justify-center text-indigo-500"
            onSubmit={handleSubmit}
            >
                <div className='w-full flex flex-col justify-center items-center gap-3'>
                    <label className='mt-3'>Email@</label>
                    <input 
                    className='w-full rounded-md px-3 border-2  hover:border-red-300 text-center' 
                    type='text' name='email' placeholder='email@emiail.com'
                    onChange={e => setEmail({email: e.target.value})}
                    />
                </div>

                {msg && Alerta(alerta)}

                <button className='w-3/4 text-white text-center bg-indigo-400 rounded-md hover:bg-indigo-600 mt-3 py-1'>Iniciar</button>
            </form>

            <div className="flex flex-row justify-between mt-5">
                <Link to='/registrar' className="text-ms hover:text-indigo-500">No te has reguistrado? Reguistrate Aqui</Link>
                <Link to='/' className="text-ms hover:text-indigo-500">Iniciar Sesion</Link>
            </div>

        </div>
    </>
    
  )
}

export default OlvidePassword