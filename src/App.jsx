import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [dataApiCall, setDataApiCall] = useState(null)

  useEffect(() => {

    const weahterApiCall = async () => {
      try {
        const response = await fetch('https://www.meteosource.com/api/v1/free/point?place_id=mexico-city&sections=all&timezone=UTC&language=en&units=metric&key=k92uzsvkiknoj2wak92lyr52o0lhqsy8fj8dv097')
        const data = await response.json()
        console.log(data)
        setDataApiCall(data)
      } catch (e) {
        console.error(e)
      }
    }

    weahterApiCall()

  }, [])


  return (
    <>

      <section className='flex h-screen bg-slate-300'>        
      <div className="flex-1 bg-gray-100 p-8">
      <h1>Weather</h1>  
          <p>
            {JSON.stringify(dataApiCall)}
          </p>
      </div>          
      <div className="w-1/3 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">Sidebar</h2>
        <p>This is the sidebar, it takes 1/3 of the width of the screen.</p>
      </div>

      </section>
    </>
  )
}

export default App
