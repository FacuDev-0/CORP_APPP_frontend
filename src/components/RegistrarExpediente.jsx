import { useState } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "./notifications_compos/Alerta"

const RegistrarExpediente = () => {
    const [datos, setDatos] = useState({
        name:'',
        second_name:'',
        last_name:'',
        second_last_name:'',
        birthday:'',
        document:'',
        password:'',
        confirm_password:'',
        phone: '',
        email: '',
        cargo: ''
    })
    const [alerta, setAlerta] = useState()
    const {registrarExpediente} = useAuth()
    const msg = alerta

    // Reguistrar Nuevo Expediente a la base de datos
    const handleNewExpediente = async (e) =>{
        e.preventDefault()
        const {name,last_name,birthday,document,cargo,local} = datos
        // Confirmar campos obligatorios
        if([name,last_name,birthday,document,cargo,local].includes('')){
            return setAlerta({msg: 'Campos Obligatorios Vacio', error: true})
        }
        
        //Registrar Expediente
        const confirmar = confirm('Deseas Guardar Este Nuevo Expediente')
        if(confirmar){
            await registrarExpediente(datos)
                .then(response => setAlerta({msg: response.msg}))
                .catch(error => setAlerta({msg: error.response.data.msg, error:true}))
        }
    }
    
  return (
    <>
        <div className="w-full h-full flex justify-center items-center">
            <div className='w-3/6 text-center m-auto p-6 shadow shadow-sky-400 rounded-xl bg-white hover:shadow-sky-200'>
                <h1 className='text-center text-xl font-semibold text-sky-500 uppercase'>
                    Reguistrar Expediente de Funcionario
                </h1>

                <form 
                className="flex flex-col gap-5 text-sky-700 uppercase items-center justify-center"
                onSubmit={handleNewExpediente}
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
                                type='date' name='birthday' 
                                onChange={e => setDatos({...datos, birthday: e.target.value})}
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
                                <label className='mt-3'>Telefono/Celular</label>
                                <input 
                                className='w-full rounded-md border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                                type='text' name='phone' placeholder='099-222-333/255-5555-222'
                                onChange={e => setDatos({...datos, phone: e.target.value})}
                                />
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Cargo</label>
                                <select className="w-full text-center border-2 border-grey-50 rounded-md"
                                onChange={e => setDatos({...datos, cargo: e.target.value})}
                                >
                                <option>Seleccione El Cargo</option>
                                <option value={'superior'}>Superior</option>
                                <option value={'local'}>Local</option>
                            </select>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-3'>
                            <label className='mt-3'>Local</label>
                            <select className="w-full text-center border-2 border-grey-50 rounded-md"
                            onChange={e => setDatos({...datos, local: e.target.value})}
                            >
                                <option>Seleccione Un Local</option>
                                <option value={'local-1'}>Local 1</option>
                                <option value={'local-2'}>Local 2</option>
                                <option value={'local-3'}>Local 3</option>
                            </select>
                        </div>

                    {msg && Alerta(alerta)}

                    <button className='w-full text-white text-center text-lg bg-sky-500 rounded-md hover:bg-sky-700 mt-1 py-1'>Registrarse</button>
                </form>
            </div>
        </div>
    </>
)}

export default RegistrarExpediente