// Componenete para crear el estilo de los Archivos privados

const DocumentosPv = ({documents, fnOpenFolder, fnOpenFile}) => {

    const typeFile = (name) => {
        // Verificamos que tipo de archivo es para asignarle su icono correspondiente
        if(name.includes('.png')) return 'png.png'
        if(name.includes('.pdf')) return 'pdf.png'
        if(name.includes('.docx')) return 'doc.png'
        if(name.includes('.jpg')) return 'jpg.png'
        return 'file_Default.png'
    }

  return (
    <>
        {documents.map(documento => 
            
            documento.type === 0 ? // 0 = Folder , 1 = File, 2 = table

            <div key={documento.id} id={documento.id} data-type={documento.mimetype} className='animate-fade-left w-full flex justify-around'
            >

                <img src={`/icons/directory.png`} className='w-8'/>

                <button
                className='w-2/3 h-fit text-emerald-800 font-semibold bg-green-100 rounded-full p-1 px-2 hover:bg-blue-400 hover:text-white whitespace-nowrap overflow-hidden'
                data-folderid={documento.id}
                value={documento.name}
                onClick={fnOpenFolder}
                >
                {documento.name}
                </button>

            </div> 
                : 
            <div key={documento.id} id={documento.id} data-type={documento.mimetype}  className='animate-fade-left w-full flex justify-around'
            >

                <img src={`/icons/${typeFile(documento.name)}`} className='w-8'/>

                <button
                className='w-2/3 h-fit text-emerald-800 font-semibold bg-green-100 rounded-full p-1 px-2 hover:bg-blue-400 hover:text-white whitespace-nowrap overflow-hidden'
                value={documento.name}
                onClick={documento.type === 1 ? fnOpenFile : () => console.log('invalido')}
                >
                {documento.name}
                </button>

            </div> 
            
        )}
    </>
  )
}

export default DocumentosPv