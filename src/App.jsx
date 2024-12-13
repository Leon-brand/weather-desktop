import { useEffect, useState, useRef } from 'react';
import './App.css';
import Overview from './components/Overview';
import Sidebar from './components/Sidebar';

function App() {

  const [bgImage, setBgImage] = useState(null),
    [dailyData, setDailyData] = useState(null),
    [currentInfo, setCurrentInfo] = useState(null),
    [dailyForecast, setDailyForecast] = useState(null);

  const basePath = "/weather-desktop";
  const mapRef = useRef(null);

  // Función para cargar Leaflet manualmente
  const loadLeaflet = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.L !== 'undefined') {
        resolve();
        return;
      }

      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
      leafletScript.async = true;
      leafletScript.onload = () => { resolve() };
      leafletScript.onerror = () => { reject(new Error('Error al cargar Leaflet')) };

      document.body.appendChild(leafletScript);
    });
  };
  // Función para cargar el script de Windy
  const loadWindyScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://api.windy.com/assets/libBoot.js"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api.windy.com/assets/libBoot.js';
      script.async = true;
      script.onload = ()=> { resolve() };
      script.onerror = ()=> { reject(new Error('Error al cargar el script de Windy')) };

      document.body.appendChild(script);
    });
  };
  // Inicializar Windy
  const initializeWindy = ()=> {
    if (window.windyInit && mapRef.current) {
      window.windyInit({
        key: 'B1Q6VVQXpJY8S1cRvuQx8CQUEeh7BFIN',
        verbose: true,
        lat: 19.4326,
        lon: -99.1332,
        zoom: 6
      })
        .then(() => { console.log('🌍 Mapa de Windy inicializado correctamente') })
        .catch((error) => { console.error('❌ Error al inicializar Windy:', error) });
    }
  };

  useEffect(()=> {

    const updateBgImage = ()=> {
      const hour = new Date();
      const timeNow = parseInt(parseInt(hour.toLocaleTimeString("es-ES", { hour: "2-digit", hour12: false })));
      if(timeNow >= 6 && timeNow < 10 || timeNow >= 17 && timeNow <= 19) setBgImage('albaOcaso')
      if(timeNow >= 10 && timeNow < 17) setBgImage('medioDia')
      if(timeNow >= 20 || timeNow <=5) setBgImage('noche')
    }

    const weahterApiCall = async () => {
      try {
        const response = await fetch(`https://www.meteosource.com/api/v1/free/point?place_id=mexico-city&sections=all&timezone=UTC&language=en&units=ca&key=k92uzsvkiknoj2wak92lyr52o0lhqsy8fj8dv097`),
          data = await response.json();
        setDailyData(data.daily.data[0])
        setCurrentInfo(data.current)
        setDailyForecast(data.daily.data)
      } catch (e) { console.error(e) }
    }

    const loadAndInitializeWindy = async () => {
      try {
        if (!mapRef.current) {
          console.error('⚠️ No se encontró el contenedor para el mapa.');
          return;
        }
        await loadLeaflet();
        await loadWindyScript();
        initializeWindy();
      } catch (error) { console.error('❌ Error al configurar Windy:', error) }
    };

    updateBgImage();
    weahterApiCall();
    loadAndInitializeWindy();

    const minute = 60000;
    const intervalId = setInterval(()=> {
      updateBgImage();
      weahterApiCall();
    }, minute*30);//Actualiza info e imagen cada 30 minutos
    return ()=> { clearInterval(intervalId) };

  }, [])

  return (
    <>
      <section className='flex min-h-screen font-primaryMedium'>
        <div
          className={"flex-1 p-8 bg-cover"}
          style={{ backgroundImage: `url(${basePath}/assets/bgImages/${bgImage || "default"}.jpg)` }}>
          <Overview dailyData={dailyData}/>
          <div
            className="mt-12 rounded-xl"
            id="windy"
            ref={mapRef}
            style={{ height: '40%', width: '100%' }}
          ></div>
        </div>
        <div className="w-1/3 bg-gradient-to-b from-sky-800 to-blue-900 text-white p-6">
          <Sidebar currentInfo={currentInfo} dailyForecast={dailyForecast}/>
        </div>
      </section>
    </>
  )
}

export default App