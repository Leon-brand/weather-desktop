import PropTypes from "prop-types";

function Forecast({ dailyForecast }) {
  if (!dailyForecast) {
    return <p>Updating...</p>;
  }
  //console.log('dailyForecast: ', dailyForecast)
  return (
    <div>
      <label className="text-3xl">Forecast <span className="text-xl">(5-days)</span></label>      
      {dailyForecast.slice(0, 5).map((forecast, index) => (
        <div key={index} className="text-xl my-4"> 
          <p className="flex justify-start">
            <img src={`src/assets/images/${forecast.icon}.png`} alt="icon" className="w-6 h-6 mr-2"/>
            {`${forecast.day}`}            
          </p>          
          <p>{forecast.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast


Forecast.propTypes = {
  dailyForecast: PropTypes.array
}