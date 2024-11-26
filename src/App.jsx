import { useEffect, useState } from 'react';
import './App.css';
import Overview from './components/Overview';
import Sidebar from './components/Sidebar';

function App() {

  const [ dailyData, setDailyData ] = useState(null)
  const [ currentInfo, setCurrentInfo ] = useState(null)

  useEffect(() => {

    const weahterApiCall = async () => {
      try {
        const response = await fetch('https://www.meteosource.com/api/v1/free/point?place_id=mexico-city&sections=all&timezone=UTC&language=en&units=metric&key=k92uzsvkiknoj2wak92lyr52o0lhqsy8fj8dv097')
        const data = await response.json()       
        setDailyData(data.daily.data[0])
        setCurrentInfo(data.current)
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }

    weahterApiCall()

  }, [])


  return (
    <>
      <section className='flex h-screen'>        
        <div className="flex-1 bg-zinc-50 p-8">
          <Overview dailyData={dailyData}/>
        </div>      
        <div className="w-1/3 bg-gradient-to-b from-sky-800 to-blue-900 text-white p-6">
          <Sidebar currentInfo={currentInfo}/>
        </div>
      </section>
    </>
  )
}

export default App
