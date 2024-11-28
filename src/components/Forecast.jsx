import PropTypes from "prop-types";
//import { useEffect, useState } from "react";

export function Forecast({dailyForecast}) {

  console.log(dailyForecast)  

  return (
    <div className="text-3xl">Example Forecast</div>
  )
}

export default Forecast

Forecast.propTypes = {
  dailyForecast: PropTypes.array
}