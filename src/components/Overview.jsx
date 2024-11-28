/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export function Overview( {dailyData} ) {

  const [windInfo, setWindInfo] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [precipitationInfo, setPrecipitationInfo] = useState(null)
  const [cloudCover, setCloudCover] = useState(null)

  useEffect(()=> {
    const setInformation = async()=> {
      try{        
        const speedInfo = await dailyData.all_day.wind.speed
        setWindInfo(speedInfo)

        const weather = await dailyData.weather
        setWeatherInfo(weather.toUpperCase())

        const precipitation = await dailyData.all_day.precipitation.type
        setPrecipitationInfo(precipitation.toUpperCase())
        
        const cloud = await dailyData.all_day.cloud_cover.total
        setCloudCover(cloud)
       
      }catch(e){
        console.error('El error fue: ', e)
      }
    }

    setInformation();
  },)

  return (
    <>
      <div>
        <Navbar/>        
        <label className='text-3xl text-slate-700'>Today Overview</label>
        <section className="grid grid-cols-2 my-4">
          <div className='bg-gray-100 rounded gap-8 my-2 mx-2'>
            Wind Speed {windInfo}
          </div>
          <div className='bg-gray-100 rounded gap-8 my-2 mx-2'>Wheater {weatherInfo}</div>
          <div className='bg-gray-100 rounded gap-8 my-2 mx-2'>Precipitation {precipitationInfo}</div>
          <div className='bg-gray-100 rounded gap-8 my-2 mx-2'>Cloud Cover {cloudCover}</div>                    
        </section>
      </div>
    </>
  )
}

export default Overview


Overview.propTypes = {
  dailyData: PropTypes.object
}