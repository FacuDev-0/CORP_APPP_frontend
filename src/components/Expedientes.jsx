import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Expedientes = ({expedientePv}) => {

  const { consultarExpedientes } = useAuth()
  const [expedientes, setExpedientes] = useState()

  //Consultar Expedientes
  useEffect(() => {
    // Consultar la base de datos por los expedientes
    const consultarExpediente = async () =>{
      await consultarExpedientes()
        .then(response => setExpedientes(response)) // Guardar Expedientes
        .catch(error => console.log(error))
    }
    consultarExpediente()
  }, [])
  // Visualizar todos los expedientes
  const MostrarExpedientes = ({datos}) =>{

  return(
      <>
          {datos && datos.map((expediente, i) =>

          <div key={i} id={expediente.document}
            className="expediente flex flex-col justify-center items-center w-20 hover:text-red-500 cursor-pointer h-fit relative"
            onClick={expedientePv} // handleInfoPv
          >

            <img src="../public/icons/folder.png" className="w-full "/>

            <p className="w-full text-center whitespace-nowrap overflow-hidden">
              {`${expediente.name.charAt(0)}.${expediente.last_name}`}
            </p>

            <p className="absolute top-50 text-sm">{expediente.document}</p>
          </div>
          )} 
      </>
  )
  
  }
  // Buscador de expedientes
  const handleSearchDocuments = (e) =>{
    e.preventDefault()
    // Se extrae los caracteres a buscar del input search
    const filtrar = (e.target.value)
    
    if(Number(filtrar) || filtrar === ''){
      //Iteramos sobre los expedientes y confirmamos si el expediente contiene los caracteres solicitados
      expedientes.forEach((expediente) => {
        // Confirmamos si existen tales caracteres en el documento
        const filtrarDiv = (`${expediente.document}`).includes(filtrar)
        // En caso de existir se mantienen visibles el div conenedor de esa informacion
        if(filtrarDiv){
          const div = document.getElementById(`${expediente.document}`)
          div.classList.remove('hidden')
        }else{
          // En caso de no hacerlo se ocultan 
          const divRemove = document.getElementById(`${expediente.document}`)
          divRemove.classList.add('hidden')
        }
      })
    }else{
      expedientes.forEach(expediente =>{
        // Extraemos el nombre y apellido. Pasamos las cadenas de texto a minuscula para que coincidan y obtener una mejor experiencia de filtrado
        const searchFor = (`${expediente.name} ${expediente.last_name}`).toLowerCase()
        const filtrarDiv = searchFor.includes(filtrar.toLowerCase())
        // Comprobamos si se filtra el expediente o no
        if(filtrarDiv){
          const div = document.getElementById(`${expediente.document}`)
          div.classList.remove('hidden')
        }else{
          const divRemove = document.getElementById(`${expediente.document}`)
          divRemove.classList.add('hidden')
        }
      })
    }
  }

  return (
    <div>
    
      <nav className="flex justify-center items-center h-14 mt-2">
        <div id="seach-documents" className="w-2/3 lg:w-1/4 h-3/4 flex flex-row justify-center items-center rounded-full overflow-hidden border-2 bg-white hover:border-sky-300"
        >
          <input type='text' name="search" placeholder="Filtrar Expediente..."
          className="text-center text-lg  h-full w-full placeholder:italic focus:outline-none"
          onChange={handleSearchDocuments}
          />
          <div 
          className="w-1/6 md:p-1"
          >
            <img src="../../public/icons/lupa.png" className="m-auto w-2/4"/>
          </div>
        </div>
      </nav>
      
      <div className="w-full max-h-screen flex flex-wrap gap-2 overflow-y-auto justify-center p-5">
        <MostrarExpedientes 
        datos={expedientes}
        />
      </div>

    </div>
    
  )
}

export default Expedientes