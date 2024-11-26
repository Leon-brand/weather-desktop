/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export function Sidebar( {currentInfo} ) {

  const [timeNow, setTimeNow] = useState(null);

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

  return (
    <div>
      <h2 className="text-2xl font-bold text-align-end">{timeNow ? timeNow : "Actualizando..."}</h2>
      <hr className="h-px my-8"/>
      <p>{JSON.stringify(currentInfo)}</p>
    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  currentInfo: PropTypes.object
}