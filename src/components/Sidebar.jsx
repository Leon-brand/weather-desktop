import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Forecast from './Forecast';

export function Sidebar( {currentInfo, dailyForecast} ) {
  
  const [timeNow, setTimeNow] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const data = new Date();
      setTimeNow(
        data.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(()=> {
    if(currentInfo){
      const tempInfo = currentInfo.temperature
      setTemperature(Math.round(tempInfo))
      const dataWeather = currentInfo.summary
      setWeather(dataWeather)
    }

  }, [currentInfo, dailyForecast])

  return (
    <div className="grid grid-cols-1 gap-2 my-3">
      <span className="text-3xl font-bold text-align-end">{timeNow ? timeNow : "Updating..."}</span >      
      <span className="text-6xl my-2 flex">
        {temperature !== null ? `${temperature}°C` : "..."}
        {dailyForecast !== null && 
          <img src={`src/assets/images/${dailyForecast[0].icon}.png`} alt="icon" className="w-16 h-16 mx-6"/> 
        }
      </span>
      <span className="text-6xl">{weather}</span>
      <hr className="h-px my-6"/>
      {dailyForecast !== null && <Forecast dailyForecast={dailyForecast}/>}

    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  currentInfo: PropTypes.object,
  dailyForecast: PropTypes.array
}