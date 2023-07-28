import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Alerta from "../components/notifications_compos/Alerta"
import clienteURL from "../config/axiosURL"

const RecuperarPassword = () => {
    const [password, setPassword] = useState(
        {password: '',confirm_password:''
    })
    const [alerta, setAlerta] = useState()
    const [tokenValido, setTokenValido] = useState()
    const {token} = useParams()
    const msg = alerta
    
    useEffect(() =>{
        // Confirmar el token de la URL
        const confirmarToken = async () =>{
            await clienteURL(`/recuperarPassword/${token}`)
            .then(response => setTokenValido(true))
            .catch(error => setTokenValido(false))
        }
        confirmarToken()
    },[])

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).includes('')){
            setAlerta({msg:'Campos Vacios' , error: true})
            return
        }

        if(password.password !== password.confirm_password) return setAlerta({msg:'Passwords no Coinciden' , error: true})

        await clienteURL.put(`/recuperarPassword/${token}`, password)
            .then(response => setAlerta({msg: response.data.msg}))
            .catch(error => {
                setAlerta({msg:error.response.data.msg, error:true})
                setTokenValido(false)
            })
    }

  return (
    <>
        <div className=' h-auto w-fit m-auto rounded-xl shadow-lg '>
            {tokenValido ?
                <>
                    <h1 className='w-full text-center text-3xl text-white font-semibold bg-green-400 rounded-t-xl py-2'>Identidad Confirmada Correctamente</h1>
                    <p className='text-xl text-center text-green-500 my-5 p-3'>
                        Se a confirmado correctamente tu Identidad, Recupera tu cuenta y no te pierdas de administrar tus expedientes.
                    </p>
                </>
                    :
                <>
                    <h1 className='w-full text-center text-3xl text-white font-semibold bg-red-400 rounded-t-xl py-2 uppercase'>Hubo un Error</h1>
                    <p className='text-xl text-center text-red-500 my-5 p-3'>
                        A ocurrido un error : Puede que se haya actualizado el password correctamente o la validacion haya expirado, vuelve a intentarlo mas tarde o contactese con servicio tecnico.
                    </p>
                    <p className='text-xl text-center text-red-500 my-5 p-3'>
                        Intente iniciar sesion nuevamente
                    </p>
                </>
            }
        </div> 

        {tokenValido ?
            <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
                <h1 className='text-center text-2xl font-bold text-indigo-400 uppercase'>Recupera Tu Cuenta</h1>
                <form className="flex flex-col gap-5 uppercase items-center text-lg justify-center text-indigo-500"
                onSubmit={handleSubmit}
                >
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Password</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                        type='password' name='password' placeholder='password'
                        onChange={e => setPassword({...password, password: e.target.value})}
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Confirmar Password</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                        type='password' name='confirm_password' placeholder='confirmar password'
                        onChange={e => setPassword({...password, confirm_password: e.target.value})}
                        />
                    </div>

                    {msg && Alerta(alerta)}

                    <button className='w-3/4 text-white text-center bg-indigo-400 rounded-md hover:bg-indigo-600 mt-3 py-1'>Confirmar Password</button>
                </form>

                <div className="flex flex-row justify-between mt-5">
                    <Link to='/' className="text-ms hover:text-indigo-500">Iniciar Sesion</Link>
                    <Link to='/registrar' className="text-ms hover:text-indigo-500">No te has reguistrado? Reguistrate Aqui</Link>
                </div>

            </div>
                : 
            <div className='w-full m-auto mt-10 p-6 shadow rounded-xl bg-white hover:shadow-indigo-300'>
                <h1 className='text-center text-2xl font-bold text-red-400 uppercase'>Recupera Tu Cuenta</h1>
                <form className="flex flex-col gap-5 uppercase items-center text-lg justify-center text-red-500">
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Password</label>
                        <input 
                        className='w-full text-center rounded-md px-3 border-2' 
                        disabled={true}
                        type='password' name='password' placeholder='password'/>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-3'>
                        <label className='mt-3'>Confirmar Password</label>
                        <input 
                        className='w-full rounded-md px-3 border-2 text-center contrast-more:border-slate-400' 
                        disabled={true}
                        type='password' name='confirm_password' placeholder='confirmar password'/>
                    </div>

                    <button className='w-3/4 text-white text-center bg-red-300 rounded-md mt-3 py-1'
                    disabled={true}
                    >Invalido</button>
                </form>

                <div className="flex flex-row justify-between mt-5">
                    <Link to='/' className="text-ms hover:text-indigo-500">Iniciar Sesion</Link>
                    <Link to='/registrar' className="text-ms hover:text-indigo-500">No te has reguistrado? Reguistrate Aqui</Link>
                </div>
            </div>
        }
    </>
    
  )
}

export default RecuperarPassword