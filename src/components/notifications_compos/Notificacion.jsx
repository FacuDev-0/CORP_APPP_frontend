const Notificacion = ({msg, error}) => {

  return (
    <div id='notificacion' 
      className='animate-fade-down animate-ease-out animate-duration-500 absolute bg-white rounded-xl shadow-lg w-64 right-40 p-1 text-center font-semibold z-50'>
        <h1 
        className={`${error ? 'text-red-400' : 'text-emerald-400' } font-ligth text-md  uppercase my-1`}
        > 
          <span className={`${error ? 'bg-red-300' : 'bg-emerald-300'} text-white rounded-full p-1 mx-2`}>    
            {error ? 'X' : `OK`}
          </span>
        {error ? 'Hubo un Error :C' : 'Exelente!!! ;D' }
        </h1>
        <p className='text-sm'>{msg}</p>
      </div>
  )
}

export default Notificacion