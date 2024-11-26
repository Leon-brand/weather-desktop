/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'; 

export function Navbar() {

  const [date, setDate] = useState('');
  const [dayName, setDayName] = useState('');
  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const infoDay = weekDays.filter((day) => date.getDay() === weekDays.indexOf(day))[0];
    

    setDate(`${day}/${month}/${year}`);
    setDayName(infoDay);
  }, []); 

  return (
    <div>
      <label className='text-3xl font-bold text-slate-900 '>{dayName}</label><br></br>
      <label className='text-lg text-gray-500'>{date}</label>
      <hr className="h-px my-8 dark:bg-gray-100"/>
    </div>
  )
}

export default Navbar

