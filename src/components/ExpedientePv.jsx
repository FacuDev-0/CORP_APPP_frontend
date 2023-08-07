import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Notificacion from './notifications_compos/Notificacion'
import DocumentosPv from './sub_components/DocumentosPv'
import EditarExpedientePv from './sub_components/EditExpedientePv'
import Excel from './sub_components/Excel'

const ExpedientePv = ({expedientePv}) => {

  const [expediente, setExediente] = useState({...expedientePv})
  const {
    consultarDocumentosPv,
    guardarArchivos, 
    saveNewFolder, 
    saveNewData,
    opendFile} = useAuth()
  const [notifiaction, setNotifiacion] = useState()
  const [documentos, setDocumentos] = useState()
  const [modalEditar, setModalEditar] = useState()

  const msg = notifiaction

  const mostrarDocumentos = async () => {
    // Solicita los documentos del directorio en uso actual
    const folderId = documentos ? documentos[documentos.length -1].folderId : expediente.id
    await consultarDocumentosPv(folderId)
      .then(response => {
          if(documentos){
            let historial = [...documentos]
            historial.pop()
            setDocumentos([...historial, response])
          }else{
            console.log(response)
            setDocumentos([response])
          }
        }
      )  
      .catch(error => setNotifiacion({msg: error.response.data.msg , error: true}))
  }

  useEffect(()=>{
      // Consultamos los documentos del directorio seleccionado
      mostrarDocumentos()
  },[])

  useEffect(() =>{
    setTimeout(() => {setNotifiacion()}, 5000)

    // En caso de error o las notificaciones se eliminan no se volvera a consultar a la base de datos
    if(notifiaction?.error === true || notifiaction === undefined) return
    // Se demora la llamada para que los datos se ingresen de forma correcta
    setTimeout(() =>{
      // Consultamos los documentos del directorio seleccionado
      mostrarDocumentos()
    }, 400)
  },[notifiaction])

  // Guardar Archivos
  const handleSaveFiles = async (e) =>{
      e.preventDefault()
      const document_owner = expediente.document
      const folder = documentos[documentos.length -1].folderId
      const files = e.target.file.files

      if(files.length === 0) return setNotifiacion({msg: 'Seleccione un archivo', error: true})
      if(files.length > 10) return setNotifiacion({msg: 'Maximo 10 Archivos', error: true})
      
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        // Confirmar que el nombre no es mayor a 50 caracteres
        if(files[i].name.length > 50)
        return setNotifiacion({msg: 'Nombre muy largo: Max 50 Caracteres', error: true})
        // Agrega todas las imagenes al formData
        const file = files[i];
        formData.append('files', file)
      }
      // Agregamos el documento para la referencia del propietario del archivo
      formData.append('files', document_owner)

      await guardarArchivos(formData, folder)
        .then(() => setNotifiacion({msg: 'Agregando Archivos...'}))
        .catch((error) => setNotifiacion({msg: error.response.data.msg, error: true}))
  }
  // Crear Nuevo Directorio
  const handleNewFolder = async (e) =>{
    e.preventDefault()

    const div = document.getElementById('newFolder')
    if(div.classList.contains('hidden')){
      div.classList.remove('hidden')
      div.classList.add('flex')
    }else{
      div.classList.remove('flex')
      div.classList.add('hidden')
    }

    if(e.target.id === 'save-newFolder'){
      // Nombre de la nueva carpeta a crear
      const newFolderName = e.target.name.value
      // Id del directorio donde se guardara la nueva carpeta
      const saveInFolder = documentos[documentos.length -1].folderId
      const obj = {
        newFolderName,
        saveInFolder
      }

      await saveNewFolder(obj)
        .then(response => setNotifiacion({msg: response.msg}))
        .catch(error => setNotifiacion({msg:error.response.data.msg, error: true}))
    }
  }
  // Abrir/Descargar Archivo
  const handleOpenFile = async (e) => {
    const idFile = e.target.parentElement.id
    const typeFile = e.target.parentElement.dataset.type

    try{
      const response = await opendFile({idFile})
      const blob = new Blob([response], { type: typeFile });
      const file = URL.createObjectURL(blob)
      
      window.open(file, '_blank')
    }catch(error){
        setNotifiacion({msg: 'Hubo un error', error: true})
    }
  }
  // Abrir Directorio seleccionado
  const handleOpenFolder = async (e) =>{
    const folderId = (e.target.dataset.folderid)
    await consultarDocumentosPv(folderId)
      .then(response => setDocumentos([...documentos, response]))
      .catch(error => console.log(error))
  }
  // Volver al directorio anterior
  const handlePreviousFolder = () =>{

    if(documentos.length === 1) return

    let previous = [...documentos]
    previous.pop()
    setDocumentos(previous)
  }
  // Mostrar formulario de edicion de informacion
  const handleModalEdit = () =>{
    setModalEditar(!modalEditar)
  }
  // Editar los datos personales del expediente
  const handleEditarExpediente = async (newData) =>{
    
    await saveNewData(newData)
      .then(response => setExediente(response))
      .then(() => setNotifiacion({msg: 'Editado Correctamente'}))
      .catch(error => setNotifiacion({msg: error.response.data.msg, error: true}))

    setModalEditar(!modalEditar)
  }

  return (
    <>
      {msg && Notificacion(notifiaction)}

      <div id='main' className='relative w-11/12 m-auto h-full grid md:grid-cols-2 grid-row-3'>

        <article id='info-pv' className='p-5'>

          <button className='w-12 h-12 bg-green-200 rounded-full hover:bg-green-400'
          onClick={handleModalEdit}
          >
            <img src="/icons/escribir (2).png"  className='m-auto w-8'/>
          </button>

          <img src='/icons/persona.png' alt='user' className='w-44 bg-emerald-200 rounded-full' />
          <div className='text-xl mt-10 grid gap-2'>
            <h1 className='text-2xl font-semibold'>
              <span>{`${expediente.name} ${expediente.second_name} ${expediente.last_name} ${expediente.second_last_name}`}</span>
            </h1>
            <p>Fecha De Nacimiento:<span className=''> {expediente.birthday}</span></p>
            <p>Documento: <span>{expediente.document}</span></p>
            <p>Telefono: <span>{expediente.phone}</span></p>
            <p>Local: <span>{expediente.local}</span></p>
            <p>Cargo: <span>{expediente.cargo}</span></p>
          </div>
        </article>
        
        <article id='documentos-pv' className='w-4/5 m-auto max-h-screen p-5'>
            <h1 className='w-full text-center text-3xl text-emerald-700 font-light my-3'>Documentos</h1>
          
            <form className='flex justify-evenly items-center my-10'
            onSubmit={handleSaveFiles}
            >

              <input type='file' id="file" name="file" multiple
              className='w-100 my-3 text-md text-slate-500
              file:mr-4 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-emerald-50 file:text-emerald-500
              hover:file:bg-emerald-100'
              />
              
              <button className='flex items-center cursor-pointer hover:bg-emerald-200 p-1 rounded-full '>
                <img src='/icons/saveFile.png' className='w-8'/>
              </button>
            </form>

            <div className='w-full h-96 flex flex-col border-2 shadow-md rounded-lg overflow-hidden overflow-y-auto gap-2'>

              <nav className='flex justify-between shadow-md m-2'>
                <button className='w-12 h-full hover:bg-green-100 transition-colors'
                onClick={() => handlePreviousFolder()}
                >
                  <img src='/icons/flechaLeft.png' className='w-10 p-2 m-auto'/>
                </button>
                <button className='mx-2 w-12 p-1 rounded-full transition-colors hover:bg-green-300'
                onClick={handleNewFolder}
                >
                <img src='/icons/newFolder.png' className='w-full'/>
                </button>
              </nav>

              <div className='scroll w-full overflow-hidden overflow-y-auto flex flex-col gap-6 pb-2'>
                <div id='newFolder'
                className='hidden animate-fade-right animate-duration-300 w-full justify-around'
                >
                  <img src={`/icons/directory.png`} className='w-8'/>
                  <form id='save-newFolder' className='relative w-2/3'
                  onSubmit={handleNewFolder}
                  >
                    <input
                    className='w-full h-fit text-center text-emerald-800 font-semibold bg-green-100 rounded-full p-1 px-2 hover:bg-blue-400 hover:text-white hover:placeholder:text-white whitespace-nowrap overflow-hidden focus:outline-none '
                    name='name'
                    type='text'
                    placeholder='Agregar Carpeta...'
                    />
                    <div 
                    className='absolute right-0 top-0 w-1/5 grid h-full rounded-e-full overflow-hidden'>
                      <button className='hover:bg-green-300 bg-green-200'
                      >Save</button>
                    </div>
                    
                  </form>

                </div> 

                {documentos && 
                <DocumentosPv 
                  documents={documentos[documentos.length - 1].documents}
                  fnOpenFolder={handleOpenFolder}
                  fnOpenFile={handleOpenFile}
                />
                }
              </div>
              
            </div>
            
        </article>
        
        <article id='tablas' className='w-full my-20 max-h-screen p-5 md:col-span-2'>

          <Excel
           documents={documentos}
           cargarDocumentos={mostrarDocumentos}
           notification={setNotifiacion}
          />

        </article>
        
        {modalEditar && 
          <article id='editarPv' className='absolute w-full bg-gray-50 bg-opacity-70 h-full '>
              <EditarExpedientePv
              expediente={expediente}
              fn={handleEditarExpediente}
              fnModal={handleModalEdit}
              />
          </article> 
        }
        
      </div>
    </>
  )
}

export default ExpedientePv