/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Forecast from './Forecast';

export function Sidebar( {currentInfo}, {dailyForecast} ) {

    

  const [timeNow, setTimeNow] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [dataForecast, setDataForecast] = useState(null);

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
   
    const setInformation = async()=> {
      try{        
        const tempInfo = await currentInfo.temperature
        setTemperature(Math.floor(tempInfo))
        console.log('temperature: ', temperature)

        const info = await dailyForecast
        setDataForecast(info)
        console.log('dataForecast: ', dataForecast)
      }catch(e){
        console.error('El error fue: ', e);
      }
    }

    setInformation();
  },[currentInfo])

  return (
    <div className="grid grid-cols-1 gap-2 my-5">
      <span className="text-4xl font-bold text-align-end">{timeNow ? timeNow : "Updating..."}</span >
      <span className="text-6xl my-4">{temperature ? temperature : "Updating..."}° C</span>
      <hr className="h-px my-8"/>
      <label>{JSON.stringify(dataForecast)}</label>
      <Forecast dailyForecast={dataForecast}/>
    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  currentInfo: PropTypes.object,
  dailyForecast: PropTypes.array
}
