import PropTypes from "prop-types";

function Forecast({ dailyForecast }) {
  if (!dailyForecast) {
    return <p>Updating...</p>;
  }

  //console.log('dailyForecast: ', dailyForecast)

  return (
    <div>
      <label className="text-3xl">Forecast</label>
      {dailyForecast.map((forecast, index) => (
        <div key={index}>
          <p>{`${forecast.day}  - ${forecast.summary}`}</p>
        </div>
      ))}
    </div>
  );
}

export default Forecast


Forecast.propTypes = {
  dailyForecast: PropTypes.array
}