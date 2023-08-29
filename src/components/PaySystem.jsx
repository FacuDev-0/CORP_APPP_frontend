import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { MercadoPagoInstance } from '@mercadopago/sdk-react/mercadoPago/initMercadoPago';
initMercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP);


const PaySystem = () => {
    const {comprar} = useAuth()


    const [preferenceID, setPreferenceID] = useState()
    const [preference, setPreference] = useState({
      items: [
      {
        title: "Gracias Wapo",
        unit_price: 100,
        quantity: 1,
      },
    ]}
    )
    const customization = {
      visual: {
          buttonBackground: 'black',
          borderRadius: '',
          valuePropColor: 'gray',
          buttonHeight: '48px'
      },
      texts: {
        action: 'buy',
        valueProp: 'none'
      },
      checkout: {
        theme: {
          elementsColor: '#FA7603',
          headerColor: '#5FFF8A'
        },
      },
     }
    
    const handleCompra = async () => {
        await comprar(preference)
            .then(response => setPreferenceID(response))
            .catch(error => console.log(error))
    }
      
    useEffect(() =>{
      console.log(preference)
    }, [preference])
    
  return (

    <>
      <div className='flex justify-center text-xl mt-10 rounded-xl'>
        <div className='w-1/4 border-2 p-2 text-center flex flex-col gap-5 rounded-xl'>
          <h1>Doname para no trabajar</h1>
          <div className='flex justify-between'>
            <h2>cantidad</h2>
            <h2>1</h2>
          </div>
          <div className='flex justify-between'>
            <h2>Total:</h2>
            <input onChange={(e) => {
              setPreferenceID()
              setPreference((prevPreference) => ({
                ...prevPreference,
                items: [
                  {
                    ...prevPreference.items[0],
                    unit_price: parseInt(e.target.value),
                  }
                ],
              }));
            }} type='number' className='border-b-2 border-b-green-200 text-center'/>
            <h2>U$S</h2>
          </div>

          {preferenceID ? 
            <div className='w-full flex justify-center'>
              <Wallet
                initialization={{ preferenceId: preferenceID, redirectMode: 'modal'}}
                customization={customization}
                onReady={() => {console.log('Read')}}
                onError={() => {console.log('Error')}}
                onSubmit={() => {console.log('submit')}}
              />
            </div>
            :
            <div className='w-full flex justify-center'>
              <button onClick={handleCompra} className='bg-blue-400 text-white py-2 px-5 rounded-xl'>Crear Donacion</button>
            </div>
          }
        </div>
      </div>
    
    </>
    
  )
}

export default PaySystem