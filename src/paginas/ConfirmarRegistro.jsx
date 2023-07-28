import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import clienteURL from "../config/axiosURL"

const ConfirmarRegistro = () => {
    const {token} = useParams()
    const [tokenValido, setTokenValido] = useState()
    
    
    useEffect(() =>{
        // Confirmar el token de la URL
        const confirmarToken = async () =>{
            await clienteURL(`/confirmar/${token}`)
            .then(response => setTokenValido(true))
            .catch(error => setTokenValido(false))
        }
        confirmarToken()
    },[])

  return (
    <>
        <div className=' h-auto w-fit m-auto rounded-xl shadow-lg '>
            {tokenValido ?
                <>
                    <h1 className='w-full text-center text-3xl text-white font-semibold bg-green-400 rounded-t-xl py-2'>Identidad Confirmada Correctamente</h1>
                    <p className='text-xl text-center text-green-500 my-5 p-3'>
                        Se a confirmado correctamente tu Identidad, Disfruta de manipular los expedientes de la forma mas organizada y visual. Agradesemos su discrecion
                    </p>
                </>
                    :
                <>
                    <h1 className='w-full text-center text-3xl text-white font-semibold bg-red-400 rounded-t-xl py-2 uppercase'>Hubo un Error</h1>
                    <p className='text-xl text-center text-red-500 my-5 p-3'>
                        A ocurrido un error : Puede que se haya confirmado la cuenta corectamente o la validacion haya expirado, vuelve a intentarlo mas tarde o contactese con servicio tecnico.
                    </p>
                    <p className='text-xl text-center text-red-500 my-5 p-3'>
                        Intente iniciar sesion nuevamente
                    </p>
                </>
            }
        </div> 

        {tokenValido ?
            <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
                <h1 className='text-center text-2xl font-bold text-indigo-400 uppercase'>Cuenta Confirmada Correctamente</h1>
                <div className="flex flex-row justify-center mt-5 ">
                    <Link to='/' className="text-2xl font-bold text-green-400 hover:text-indigo-500">Iniciar Sesion</Link>
                </div>
            </div>
                : 
            <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
                <h1 className='text-center text-2xl font-bold text-red-400 uppercase'>
                    Inicia Sesion
                </h1>
                <div className="flex flex-row justify-between mt-5">
                    <Link to='/' className="text-ms hover:text-indigo-500">Iniciar Sesion</Link>
                    <Link to='/registrar' className="text-ms hover:text-indigo-500">No te has reguistrado? Reguistrate Aqui</Link>
                </div>
            </div>
        }
    </>
    
  )
}

export default ConfirmarRegistro