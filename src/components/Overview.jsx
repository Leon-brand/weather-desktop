import PropTypes from 'prop-types';
import Navbar from './Navbar';

export function Overview( {dailyData} ) {

 

  return (
    <>
      <div>
        <Navbar/>        
        <p>{JSON.stringify(dailyData)}</p>
      </div>
    </>
  )
}

export default Overview


Overview.propTypes = {
  dailyData: PropTypes.object
}