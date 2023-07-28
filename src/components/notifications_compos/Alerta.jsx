// Alerta para notificar mensajes de cliente o API
const Alerta = ({msg, error}) => {
  return (
    <div className={`${error ? 'bg-red-400' : 'bg-green-400' } w-full text-white text-center p-1 rounded-md`}>
        <h1>{msg}</h1>
    </div>
  )
}

export default Alerta