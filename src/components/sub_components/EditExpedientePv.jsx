import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Alerta from "../notifications_compos/Alerta"

const EditarExpedientePv = ({expediente, fnModal , fn}) => {
    const [data, setData] = useState(expediente)
    const [alerta, setAlerta] = useState()
    const msg = alerta

    // Reguistrar Nuevo Expediente a la base de data
    const handleNewExpediente = async (e) =>{
        e.preventDefault()
        
        const {name,last_name,birthday,document,cargo,local} = data
        // Confirmar campos obligatorios
        if([name,last_name,birthday,document,cargo,local].includes('')){
            return setAlerta({msg: 'Campos Obligatorios Vacio', error: true})
        }
        //Registrar Expediente
        const confirmar = confirm('Deseas Guardar Este Nuevo Expediente')
        if(confirmar){
            fn(data)
        }
        
    }
    
  return (
    <>
        <div className="w-full h-full pt-5">
            <div className="w-5/5 lg:w-3/5 flex justify-end my-5 m-auto">
               <button className="w-10 h-10 bg-red-300 rounded-full hover:bg-red-500"
               onClick={fnModal}
               >X</button> 
            </div>
            
            <div className='w-full lg:w-3/6 text-center m-auto p-6 rounded-md bg-white shadow-xl shadow-slate-400'>
                <h1 className='text-center text-xl font-semibold text-sky-500 uppercase'>
                    Editar Expediente
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
                            type='text' name='name'
                            value={data.name}
                            onChange={e => setData({...data, name: e.target.value})}
                            />
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-3'>
                            <label className='mt-3'>Segundo Nombre</label>
                            <input 
                            className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center' 
                            type='text' name='second_name' placeholder='second name'
                            value={data.second_name}
                            onChange={e => setData({...data, second_name: e.target.value})}
                            />
                        </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Apellido</label>
                                <input 
                                className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                                type='text' name='last_name' placeholder='last name'
                                value={data.last_name}
                                onChange={e => setData({...data, last_name: e.target.value})}
                                />
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Segundo Apellido</label>
                                <input 
                                className='w-full rounded-md px-3 border-2 hover:border-red-300 text-center' 
                                type='text' name='second_last_name' placeholder='second last name'
                                value={data.second_last_name}
                                onChange={e => setData({...data, second_last_name: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Fecha de nacimiento</label>
                                <input 
                                className='w-full text-center rounded-md px-3 border-2 hover:border-red-300' 
                                type='date' name='birthday' 
                                value={data.birthday}
                                onChange={e => setData({...data, birthday: e.target.value})}
                                />
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Documento</label>
                                <input 
                                className='w-full rounded-md px-3 border-2 text-center contrast-more:border-slate-400' 
                                type='number' name='document'
                                placeholder={data.document}
                                disabled={true}
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-center items-center gap-3'>
                            <label className='mt-3'>Email@</label>
                            <input 
                            className='w-full rounded-md border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                            type='text' name='email' placeholder='correo@correo.com'
                            value={data.email}
                            onChange={e => setData({...data, email: e.target.value})}
                            />
                        </div>
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Telefono/Celular</label>
                                <input 
                                className='w-full rounded-md border-2 hover:border-red-300 text-center contrast-more:border-slate-400' 
                                type='text' name='phone' placeholder='099-222-333/255-5555-222'
                                value={data.phone}
                                onChange={e => setData({...data, phone: e.target.value})}
                                />
                            </div>
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                <label className='mt-3'>Cargo</label>
                                <select className="w-full text-center border-2 border-grey-50 rounded-md"
                                value={data.cargo}
                                onChange={e => setData({...data, cargo: e.target.value})}
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
                            onChange={e => setData({...data, local: e.target.value})}
                            value={data.local}
                            >
                                <option>Seleccione Un Local</option>
                                <option value={'local-1'}>Local 1</option>
                                <option value={'local-2'}>Local 2</option>
                                <option value={'local-3'}>Local 3</option>
                            </select>
                        </div>

                    {msg && Alerta(alerta)}

                    <button className='w-full text-white text-center text-lg bg-sky-500 rounded-md hover:bg-sky-700 mt-1 py-1'>Editar</button>
                </form>
            </div>
        </div>
    </>
)}

export default EditarExpedientePv