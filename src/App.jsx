import { useEffect, useState } from 'react';
import './App.css';
import Overview from './components/Overview';
import Sidebar from './components/Sidebar';

function App() {

  const [dailyData, setDailyData] = useState(null)
  const [currentInfo, setCurrentInfo] = useState(null)
  const [dailyForecast, setDailyForecast] = useState(null)

  useEffect(() => {

    const weahterApiCall = async () => {
      try {
        const response = await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=mexico-city&sections=all&timezone=UTC&language=en&units=ca&key=k92uzsvkiknoj2wak92lyr52o0lhqsy8fj8dv097`)
        const data = await response.json()       
        setDailyData(data.daily.data[0])
        setCurrentInfo(data.current)
        setDailyForecast(data.daily.data)
        console.log('data: ', data)
      } catch (e) {
        console.error(e)
      }
    }

    weahterApiCall()

    const fetchMapTile = async () => {
      const url = 'https://tile.openweathermap.org/map/clouds_new/10/299/467.png?appid=9a85654bf4e72c25aeed56a99cd7845b';
    
      try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        // Convertimos a Blob
        //const blob = await new Blob([response.body], { type: 'image/png' });
        const blob = await response.blob();
    
        // Creamos la URL para el blob
        const imageUrl = URL.createObjectURL(blob);
    
        // Asignamos al elemento <img>
        const imgElement = document.getElementById('mapTile');
        imgElement.src = imageUrl;
    
        // Opcional: liberar la URL después de un tiempo para evitar fugas de memoria
        setTimeout(() => URL.revokeObjectURL(imageUrl), 30000); // Libera después de 30 segundos
      } catch (error) {
        console.error('Error fetching map tile:', error);
      }
    };
    
    fetchMapTile();



  }, [])

  return (
    <>
      <section className='flex h-screen font-primaryMedium'>        
        <div className="flex-1 bg-zinc-50 p-8">
          <Overview dailyData={dailyData}/>
          <img id="mapTile" alt="Weather Map Tile" width="500" height="250"/>
        </div>   
        <div className="w-1/3 bg-gradient-to-b from-sky-800 to-blue-900 text-white p-6">
          <Sidebar currentInfo={currentInfo} dailyForecast={dailyForecast}/>
        </div>
      </section>
    </>
  )
}

export default App
