import { useState, createContext } from "react";
import clienteURL from "../config/axiosURL";

const AuthContext = createContext()

const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({})

    // Consultar Expedientes en la Base de datos 
    const consultarExpedientes = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            }
        }
        const {data} = await clienteURL.post('/admin', auth, config)
        return data.expedientes
    }
    // Registrar Nuevo Expediente
    const registrarExpediente = async (datos) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            }
        }
        const {data} = await clienteURL.post('/admin/registrarExpediente', datos, config)
        return data
    }
    // Consultar un expediente privado en concreto
    const consultarExpedientePv = async (document) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`
            }
        }
        const {data} = await clienteURL.post('admin/expedientePv',document, config)
        return data
    }
    //Consultamos los documentos privados el individuo (owner) seleccionado
    const consultarDocumentosPv = async (folderId) => {

        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
            }
        }
        const {data} = await clienteURL.post(`admin/consultarDocumentosPv/${folderId}`,{folderId}, config)
        return data
    } 
    // Buscar el archivo seleccionado para visualizar o descargar
    const opendFile = async (idFile) => {
        const config = {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/opendFile` ,idFile, config)
        return data
    } 
    //Guardar Archivos en la Base de Datos
    const guardarArchivos = async (files, folder) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }   
        const data = await clienteURL.post(`admin/almacenarArchivos/${folder}`,files, config)
        return data
    }
    //Crea un nuevo directorio
    const saveNewFolder = async (info) => {
        console.log(info)
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/saveNewFolder`,info, config)
        return data
    }
    // Guardar nueva informacion del expediente privado editado (ExpedientePv)
    const saveNewData = async (newData) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/saveNewData`,newData , config)
        return data
    }
    // Crear una nueva tabla
    const createNewTable = async (newTable) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/createNewTable`,newTable, config)
        return data
    }
    // Guardar los cambios de una tabla 
    const saveTable = async (table) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/saveTable`,table , config)
        return data
    }
    // Consultar los datos de una tabla
    const queryTable = async (table) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/consultarTabla` ,table, config)
        return data
    }

    const comprar = async (preference) => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        }   
        const {data} = await clienteURL.post(`admin/create-order`,preference, config)
        return data
    }

    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            consultarExpedientes,
            registrarExpediente,
            consultarExpedientePv,
            consultarDocumentosPv,
            guardarArchivos,
            saveNewFolder,
            saveNewData,
            createNewTable,
            saveTable,
            queryTable,
            opendFile,
            comprar
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export default AuthContext