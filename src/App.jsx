import { useEffect, useState } from 'react';
import './App.css';
import Overview from './components/Overview';
import Sidebar from './components/Sidebar';

function App() {

  const [bgImage, setBgImage] = useState(null),
    [dailyData, setDailyData] = useState(null),
    [currentInfo, setCurrentInfo] = useState(null),
    [dailyForecast, setDailyForecast] = useState(null);

  useEffect(() => {

    const weahterApiCall = async () => {
      try {
        const response = await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=mexico-city&sections=all&timezone=UTC&language=en&units=ca&key=k92uzsvkiknoj2wak92lyr52o0lhqsy8fj8dv097`),
          data = await response.json();
        setDailyData(data.daily.data[0])
        setCurrentInfo(data.current)
        setDailyForecast(data.daily.data)
        console.log('data: ', data)
      } catch (e) {
        console.error(e)
      }
    }

    weahterApiCall()

    //Queda pendiente esta parte para proximas versiones ya que no tenenos error pero
    //no se muestra imagen del mapa
    /*     const fetchMapTile = async () => {
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
    }; */
    //fetchMapTile();

  }, [])

  useEffect(() => {

    const updateBgImage = ()=> {
      const hour = new Date();
      const timeNow = parseInt(hour.toLocaleTimeString("es-ES", { hour: "2-digit", hour12: false }));

      if(timeNow >= 6 && timeNow < 10 || timeNow >= 18 && timeNow < 20) setBgImage('albaOcaso')
      if(timeNow >= 10 && timeNow < 18) setBgImage('medioDia')
      if(timeNow >= 20 || timeNow <=5) setBgImage('noche')

    }

    updateBgImage();

  }, [])

  return (
    <>
      <section className='flex h-screen font-primaryMedium'>
        <div
          className={bgImage
            ? `flex-1 p-8 bg-[url(./assets/bgImages/${bgImage}.jpg)] h-screen bg-cover`
            : `flex-1 p-8 bg-[url(./assets/bgImages/default.jpg)] h-screen bg-cover`}>
          <Overview dailyData={dailyData}/>
          {/* <img id="mapTile" alt="Weather Map Tile" width="500" height="250"/> */}
        </div>
        <div className="w-1/3 bg-gradient-to-b from-sky-800 to-blue-900 text-white p-6">
          <Sidebar currentInfo={currentInfo} dailyForecast={dailyForecast}/>
        </div>
      </section>
    </>
  )
}

export default App
