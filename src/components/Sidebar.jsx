import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Forecast from './Forecast';

export function Sidebar( {currentInfo, dailyForecast} ) {

  const [timeNow, setTimeNow] = useState(null),
    [temperature, setTemperature] = useState(null),
    [weather, setWeather] = useState(null),
    [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const data = new Date();
      setTimeNow(
        data.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      );
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(()=> {
    if(currentInfo && dailyForecast){
      const tempInfo = currentInfo.temperature
      const dataWeather = currentInfo.summary
      const dataIcon = dailyForecast[0].icon
      setTemperature(Math.round(tempInfo))
      setWeather(dataWeather)
      setWeatherIcon(dataIcon)
    }
  }, [currentInfo, dailyForecast])

  const basePath = "/weather-desktop";

  return (
    <div className="grid grid-cols-1 gap-2 my-3">
      <span className="text-3xl font-bold text-align-end">{timeNow ? timeNow : "Updating..."}</span >
      <span className="text-6xl my-2 flex">
        {temperature !== null ? `${temperature}°C` : "..."}
        <img
          src={`${basePath}/assets/images/${weatherIcon || "3"}.png`}
          alt="weather-icon"
          className="w-16 h-16 mx-6"
        />
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
