/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export function Navbar() {

  const [date, setDate] = useState(''),
    [dayName, setDayName] = useState(''),
    weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    const date = new Date(),
      day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      infoDay = weekDays.filter((day) => date.getDay() === weekDays.indexOf(day))[0];

    setDate(`${day}/${month}/${year}`);
    setDayName(infoDay);
  }, []);

  return (
    <div>
      <div className='flex justify-between text-3xl font-bold text-white'>
        <label className='font-bold text-white'>{dayName}</label>
        <label>Mexico City</label>
      </div>
      <label className='text-2xl text-white'>{date}</label>
      <hr className="h-px my-8 dark:bg-gray-100"/>
    </div>
  )
}

export default Navbar

