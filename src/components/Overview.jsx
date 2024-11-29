/* eslint-disable react-hooks/exhaustive-deps */
import { PiWind } from "react-icons/pi";
import { PiCloudRain } from "react-icons/pi";
import { BsClouds } from "react-icons/bs";
import { WiDayCloudyGusts } from "react-icons/wi";
import { PiSun } from "react-icons/pi";
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export function Overview( {dailyData} ) {

  const [windInfo, setWindInfo] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [precipitationInfo, setPrecipitationInfo] = useState(null)
  const [cloudCover, setCloudCover] = useState(null)

  useEffect(()=> {

    if(dailyData){
      const speedInfo = dailyData.all_day.wind.speed
      setWindInfo(speedInfo)
      
      const weather = dailyData.weather
      setWeatherInfo(capitalizeFirstLetter(weather))

      const precipitation = dailyData.all_day.precipitation.type
      setPrecipitationInfo(capitalizeFirstLetter(precipitation))
      
      const cloud = dailyData.all_day.cloud_cover.total
      setCloudCover(cloud)
    }
    
  },)

  function capitalizeFirstLetter(string) {
    let myString = string.toLowerCase();
    return myString.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div>
        <Navbar/>        
        <label className='text-3xl text-slate-700'>Today overview</label>
        <section className="grid grid-cols-2 my-4">
          <div className='text-2xl text-slate-500 bg-gray-100 rounded-xl gap-8 my-2 mx-2 p-6'>
            <span className="flex justify-center">
             <PiWind className="w-8 h-8 text-blue-500 mx-2"/>
             Wind Speed 
            </span>
            <span className="flex justify-center text-slate-700">{windInfo !== null && windInfo} km/h</span>
          </div>
          <div className='text-2xl text-slate-500 bg-gray-100 rounded-xl gap-8 my-2 mx-2 p-6'>
            <span className="flex justify-center">
             {weatherInfo === 'SUNNY' ? <PiSun className="w-8 h-8 text-blue-500 mx-2"/> :
               <WiDayCloudyGusts className="w-8 h-8 text-blue-500 mx-2"/> }               
             Wheater Data
            </span>
            <span className="flex justify-center text-slate-700">{weatherInfo !== null && weatherInfo}</span>            
          </div>
          <div className='text-2xl text-slate-500 bg-gray-100 rounded-xl gap-8 my-2 mx-2 p-6'>
            <span className="flex justify-center">
            <PiCloudRain className="w-8 h-8 text-blue-500 mx-2"/>
            Precipitation
            </span>
            <span className="flex justify-center text-slate-700">{precipitationInfo !== null && precipitationInfo}</span>             
          </div>
          <div className='text-2xl text-slate-500 bg-gray-100 rounded-xl gap-8 my-2 mx-2 p-6'>
            <span className="flex justify-center">
            <BsClouds className="w-8 h-8 text-blue-500 mx-2"/>
            Cloud Cover
            </span>
            <span className="flex justify-center text-slate-700" >{cloudCover !== null && cloudCover}%</span>             
          </div>                    
        </section>
      </div>
    </>
  )
}

export default Overview

Overview.propTypes = {
  dailyData: PropTypes.object
}