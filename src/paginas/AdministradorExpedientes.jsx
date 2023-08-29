import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

import Expedientes from "../components/Expedientes"
import RegistrarExpediente from "../components/RegistrarExpediente"
import ExpedientePv from "../components/ExpedientePv"
import PaySystem from "../components/paySystem"

const AdministradorExpedientes = () => {
  const {consultarExpedientePv} = useAuth()
  const [expedientePv, setExpedientePv] = useState()
  const [view, setView] = useState()

  useEffect(() => {
      setView('expedientes')
  }, [])

  // Mostrar ExpedientePv
  useEffect(() => {
    if(expedientePv){
      setView('expedientePv')
    }
  }, [expedientePv])

  // Consultar informacion privada del expediente seleccionado  
  const handleInfoPv = async (e) =>{
    e.preventDefault();
    const document = {document: e.target.parentNode.id}
    
    if(!document) return

    await consultarExpedientePv(document)
      .then(response => setExpedientePv(response))
      .catch(error => console.log(error))
  }

  return (
    <>
      <header className='h-20 bg-slate-700 px-5 flex items-center'>
        <nav className='w-full flex justify-between items-center'>
          <h1 className='text-5xl uppercase'>
            <span className='text-orange-500 font-semibold'>Inisa</span>
          </h1>
          <button className='text-1xl uppercase'>
            <span className='text-orange-500 font-semibold'>Cerrar Sesion</span>
          </button>
        </nav>
      </header>

      <main className='min-h-screen flex w-full '>
          <section id="nav" className="flex-none">
            <nav id='options' className='bg-slate-100 h-full flex-none flex px-1'>
              <div className='flex flex-col gap-10 mt-10'>
                <button 
                  className={`${view === 'expedientes' && 'bg-sky-200' } w-full rounded-md hover:bg-sky-300`}
                  value={1}
                  onClick={() => setView('expedientes')}
                >
                  <img src='/icons/expedientes.png' alt='expedientes' className='w-12 p-2 m-auto'/>
                </button>
                <button 
                className={`${view === 'registrar' && 'bg-sky-200' } w-full rounded-md hover:bg-sky-300`}
                  value={2}
                  onClick={() => setView('registrar')}
                >
                  <img src='/icons/registrar.png' alt='registrar' className='w-12 p-2 m-auto'/>
                </button>

                <button 
                className={`${expedientePv !== undefined && 'bg-green-200' } w-full rounded-md hover:bg-sky-300`}
                  value={2}
                  disabled={expedientePv === undefined && true}
                  onClick={() => setView('expedientePv')}
                >
                  <img src='/icons/user.png' alt='user' className='w-12 p-2 m-auto'/>
                </button>
                <button 
                  className={`${view === 'paySystem' && 'bg-sky-200' } w-full rounded-md hover:bg-sky-300`}
                  value={1}
                  onClick={() => setView('paySystem')}
                >
                  <img src='/icons/expedientes.png' alt='expedientes' className='w-12 p-2 m-auto'/>
                </button>
              </div>
            </nav>
          </section>
           
          <section id='views' className='grow overflow-y-auto'>

            {view === 'expedientes' && 
            <Expedientes
              expedientePv={handleInfoPv}
            />}

            {view === 'registrar' && 
            <RegistrarExpediente />
            }

            {view === 'expedientePv' && 
            <ExpedientePv 
              expedientePv={expedientePv}
            />}

            {view === 'paySystem' && 
            <PaySystem />
            }
          </section>

          {/* <aside id='expedientesVistos' className='flex-none w-1/5 bg-slate-100 text-center'>
            <h1>Historial</h1>
          </aside> */}

      </main>
    </>
 
  )
}

export default AdministradorExpedientes