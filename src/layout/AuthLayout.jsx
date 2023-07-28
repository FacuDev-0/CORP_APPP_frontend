import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  
  return (
    <>  
        <header className='mb-5'>
            <h1 className='text-center text-3xl text-indigo-400 font-bold uppercase bg-indigo-50 py-5'>Administrador de expedientes</h1>
        </header>
        <main className="container-fluid mx-auto px-10 mb-2 md:px-20 lg:grid lg:grid-cols-2 gap-10 bg-gray-50">
           <Outlet /> 
        </main> 
    </>
  )
}


export default AuthLayout