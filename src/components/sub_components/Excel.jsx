import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

const Excel = ({documents, cargarDocumentos, notification}) => {

  const {saveTable, queryTable, createNewTable} = useAuth()
  const [subMenu, setSubMenu] = useState()
  const [table, setTable] = useState({data: Array.from({length: 30}, (_,index) =>{
    if(index === 0){
      const cols = '_ABCDEFGHIJKMNÑ'
      return (Array.from({length: 20}, (_,i) => ({
        type: 'th', text: cols[i], span:1, color:'bg-gray-100'
      })))
    }
    return (Array.from({length: 20}, (_,i) => {
        if(i === 0){
          return ({type: 'th', text: index, span:1, color:'bg-gray-100'})
        }else{
         return ({ type: 'td', text:  '', span:1, color:'bg-white'})
        }
      }))
  })})

  // Funciones del Nav

  // Consultar tabla seleccionada
  const handleQueryTable = async (e) =>{
    const id = e.target.value
    if(id === '0') return

    await queryTable({id})
      .then(response => setTable({id, data: response}))
      .catch(error => notification({msg: error.response.data.msg, error: true}))
  }
  // Crear nueva tabla
  const handleCreateNewTable = async (e) =>{
    e.preventDefault()
    const name = (e.target.name.value)
    const confirmar = confirm(`Crear nueva tabla llamada "${name}"`)

    if(name === '' || !confirmar ) return setNotifiacion({msg: 'Agregue un nombre', error:true})

    const newTable = Array.from({length: 50}, (_,index) =>{
    if(index === 0){
      const cols = '_ABCDEFGHIJ'
      return (Array.from({length: 20}, (_,i) => ({
        type: 'th', text: cols[i], span:1, color:'bg-gray-100'
      })))
    }
    return (Array.from({length: 20}, (_,i) => {
        if(i === 0){
          return ({type: 'th', text: index, span:1, color:'bg-gray-100'})
        }else{
         return ({ type: 'td', text:  '', span:1, color:'bg-white'})
        }
      }))
    })

    const infoObj = {
      newTable: JSON.stringify(newTable),
      name,
      saveInFolder: documents[0].folderId
    }

    await createNewTable(infoObj)
      .then(response => {
        notification({msg: response.msg})
        cargarDocumentos() // Recargamos los documentos para visuar la nueva tabla en el selectori
      })
      .catch(error => notification({msg: error.response.data.msg, error:true}))
  }
  // Guardar cambios 
  const handleSaveTable = async () =>{
    const objInfo = {
      id: table.id,
      table: JSON.stringify(table.data)
    }
    await saveTable(objInfo)
      .then(response => notification({msg: response.msg}))
      .catch(error => notification({msg: error.response.data.msg, error:true}))
  }

  // Funciones de Tabla

  // Estructura de subMenu
  const handleSubMenu = (e) => {
    e.preventDefault()

    setSubMenu(() => {
      return (
        <div className='flex flex-col gap-5 w-48 border bg-white p-2' 
          style={{
                position: 'absolute',
                left: (e.pageX) - 100,
                top: (e.pageY) - 70,
                zIndex: 9999,
          }}
        > 
          <div className='flex gap-2'>
            <button className='w-1/2 border hover:bg-slate-300' 
              onClick={() => new EditFns(e.target).addSpan()}
            >+</button>
            <button className='w-1/2 border hover:bg-slate-300' 
              onClick={() => new EditFns(e.target).removeSpan()}
            >-</button>
          </div>

          <div>
            <button className='hover:bg-blue-50 border w-1/2' 
            onClick={() => new EditFns(e.target).type('td')}
            >
              Texto
            </button>
            
            <button className='hover:bg-blue-50 border w-1/2' 
            onClick={() => new EditFns(e.target).type('th')}
            >
              Titulo
            </button>
          </div>

          <div className='flex gap-2 h-8'>
            <button className='w-1/3 rounded-full bg-green-300' 
              onClick={() => new EditFns(e.target).color('bg-green-100')}
            ></button>
            <button className='w-1/3 rounded-full bg-red-300' 
              onClick={() => new EditFns(e.target).color('bg-red-100')}
            ></button>
            <button className='w-1/3 rounded-full bg-blue-300' 
              onClick={() => new EditFns(e.target).color('bg-blue-100')}
            ></button>
          </div>

        </div>
      )
    })
  }
  // Funciones del subMenu
  class EditFns {
    constructor(element){
      this.element = element
      this.row = (this.element.dataset.coordenadas).split('-')[0]
      this.col = (this.element.dataset.coordenadas).split('-')[1]
    }
    addSpan(){
      let editTable = {...table}
      editTable.data[this.row][this.col].span = 2
      setTable(editTable)
    }
    removeSpan(){
      let editTable = {...table}
      editTable.data[this.row][this.col].span = 1
      setTable(editTable)
    }
    type(type){
      let editTable = {...table}
      editTable.data[this.row][this.col].type = type 
      setTable(editTable)
    }
    color(color){
      let editTable = {...table}
      if(editTable.data[this.row][this.col].color === color){
        editTable.data[this.row][this.col].color = ''
      }else{
        editTable.data[this.row][this.col].color = color
      }
      setTable(editTable)
    }
  }
  // Ingreso de datos
  const handleThInputChange = (rowIndex, cellIndex, newText) => {
    setTable((prevTable) => {
      const updatedTable = {...prevTable};
      updatedTable.data[rowIndex][cellIndex].text = newText;
      return updatedTable;
    });
  };
  
  return (
      <>
        {subMenu}

        <nav id='nav-tables' className='w-full flex justify-between items-center border rounded-xl border-slate-400 bg-white mb-4 p-1 px-5'>

          <select id='select-tables' className='w-2/12 border-2 border-lime-400 text-center font-light rounded-md'
          onChange={handleQueryTable}
          >
            <option value={0}>Seleccionar Tabla</option>

            {documents && documents[documents.length -1].tables.map(e =>
              <option value={e.id}> {e.name} </option>
            )} 
            
          </select>

          <div>

            <button id='save-table' className='items-center cursor-pointer hover:bg-emerald-200 p-1 rounded-full '
            onClick={handleSaveTable} 
            >
                <img src='/icons/saveFile.png' className='w-8'/>
            </button>
              
          </div>
          
          <form id='create-table' onSubmit={handleCreateNewTable}
            className='flex gap-2 justify-between items-center h-10'
          >

            <input type='text' name='name' className=' h-8 text-center text-sm border border-slate-400 rounded-full focus:outline-none hover:border-black'/>

            <button className='items-center flex gap-1 hover:bg-emerald-200 p-1 rounded-full'
            > 
              <img src='/icons/mas.png' className='w-8'/>
            </button>
          </form>
          
        </nav>

        <div id='containerFather-table' className='w-full h-96 overflow-auto'>
          <div id='container-table' className='bg-white'>
            
            <table className='text-sm' 
              onClick={() => setSubMenu()}
              onContextMenu={handleSubMenu}
            >

              <thead>
                {table.data[0].map((cell, cellIndex)=> {
                    const {text, span, color} = cell
                    return(
                      <th
                        data-coordenadas={`0-${cellIndex}`}
                        colSpan={span}
                        className={color}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>{ 
                          handleThInputChange(
                            0,
                            cellIndex,
                            e.target.textContent
                          );
                        }}
                      >
                        {text}
                      </th>
                    )
                })}
              </thead>
              
              <tbody>
                {table.data.map((element, rowIndex) =>
                  rowIndex !== 0 && 
                  <tr>
                    {element.map((cell, cellIndex)=> {
                      const {type, text, span, color} = cell

                      return(
                        <>
                          {type === 'td' ? 
                            <td  
                              data-coordenadas={`${rowIndex}-${cellIndex}`}
                              colSpan={span}
                              className={color}
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              onBlur={(e) =>{ 
                                handleThInputChange(
                                  rowIndex,
                                  cellIndex,
                                  e.target.textContent
                                );
                              }}
                            >
                              {text}
                            </td>
                          :
                            <th 
                              data-coordenadas={`${rowIndex}-${cellIndex}`}
                              colSpan={span}
                              className={color}
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              onBlur={(e) =>{ 
                                handleThInputChange(
                                  rowIndex,
                                  cellIndex,
                                  e.target.textContent
                                );
                              }}
                            >
                              {text}
                            </th>
                          }
                        </>
                      )
                    })}
                  </tr>
                )}
              </tbody>
                  
            </table>
            
          </div>
        </div>
      </>
  )
}

export default Excel