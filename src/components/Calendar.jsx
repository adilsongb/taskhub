import { useState, useEffect, useContext } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import appContext from '../context/context';
import '../styles/Calendar.css';

function Calendar() {
  const months = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const { date, setDate, setViewCal, setLoading } = useContext(appContext);
  const [dateMod, setDateMod] = useState(date); 
  const [days, setDays] = useState({ prevDays: [], daysNow: [], nextDays: [] });
  const [month, setMonth] = useState(months[dateMod.month - 1]);

  function prevMonth() {
    let updateDateMonth;
    let updateDateYear = dateMod.year;

    if (dateMod.month === 1) {
      updateDateMonth = 12;
      updateDateYear = dateMod.year - 1;
    } else {
      updateDateMonth = dateMod.month - 1;
    }

    setMonth(months[updateDateMonth - 1]);
    setDateMod({ ...dateMod, year: updateDateYear, month: updateDateMonth });
  }

  function nextMonth() {
    let updateDateMonth;
    let updateDateYear = dateMod.year;

    if (dateMod.month === 12) {
      updateDateMonth = 1;
      updateDateYear = dateMod.year + 1;
    } else {
      updateDateMonth = dateMod.month + 1;
    }

    setMonth(months[updateDateMonth - 1]);
    setDateMod({ ...dateMod, year: updateDateYear, month: updateDateMonth });
  }

  function changeDate(day) {
    setViewCal(false);
    setLoading(true);
    setDate({ ...dateMod, day });
  }

  function changeDatePrevMonth(day) {
    setViewCal(false);
    setLoading(true);
    if (dateMod.month === 1) {
      setDate({ year: dateMod.year - 1, month: 12, day });
    } else {
      setDate({ ...dateMod, month: dateMod.month - 1, day });
    }
  }

  function changeDateNextMonth(day) {
    setViewCal(false);
    setLoading(true);
    if (dateMod.month === 12) {
      setDate({ year: dateMod.year + 1, month: 1, day });
    } else {
      setDate({ ...dateMod, month: dateMod.month + 1, day });
    }
  }

  useEffect(() => {
    function renderDays() {
      let daysTotal = 42;
      let arrayPrevDays = [];
      let arrayDays = [];
      let arrayNextDays = [];
  
      // Ultimo dia do mes atual:
      const lastDay = new Date(dateMod.year, dateMod.month, 0).getDate();
  
      // Ultimo dia do mes anterior:
      const prevLastDay = new Date(dateMod.year, dateMod.month - 1, 0).getDate();
  
      // Dia da semana do primeiro dia do mes:
      const firstDayIndex = new Date(dateMod.year, dateMod.month - 1, 1).getDay();
  
      // Dia da semana do ultimo dia do mes:
      const lastDayIndex = new Date(dateMod.year, dateMod.month, 0).getDay();
  
      const nextDays = 7 - lastDayIndex - 1;
  
      for (let x = firstDayIndex; x > 0; x--) {
        arrayPrevDays.push(prevLastDay - x + 1);
        daysTotal -= 1;
      }
  
      for (let i = 1; i <= lastDay; i++) {
        arrayDays.push(i);
        daysTotal -= 1;
      }
  
      for (let j = 1; j <= nextDays; j++) {
        arrayNextDays.push(j);
        daysTotal -= 1;
      }
  
      for (let c = 1; c <= daysTotal; c++) {
        arrayNextDays.push(nextDays + c);
      }
  
      setDays({
        daysNow: arrayDays,
        prevDays: arrayPrevDays,
        nextDays: arrayNextDays
      });
    }
    renderDays();
  }, [dateMod])

  return (
    <div className="floatFull-container">
      <div className="calendar">
        <div className="month">
            <button onClick={ prevMonth }><FaAngleLeft /></button>
            <h1>{ month }</h1>
            <button onClick={ nextMonth }><FaAngleRight /></button>
        </div>
        <div className="weekdays">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>
        <div className="days">
          { days.prevDays.map((day, i) => {
              return (
                <div className="prev-date" key={ i }>
                  <span onClick={ () => changeDatePrevMonth(day)}>{ day }</span>
                </div>
              )
            }) }

          { days.daysNow.map((day, i) => {
              if (day === new Date().getDate() && (dateMod.month - 1) === new Date().getMonth() && dateMod.year === new Date().getFullYear()) {
                return ( 
                  <div key={ i }>
                    <span className="today xp3" onClick={ () => changeDate(day)}>
                      { day }
                    </span>
                  </div>
                );
              }
              return (
                <div key={ i }>
                  <span onClick={ () => changeDate(day) }>{ day }</span>
                </div>
              )
            }) }

          { days.nextDays.map((day, i) => {
              return (
                <div className="next-date" key={ i }>
                  <span onClick={ () => changeDateNextMonth(day)}>{ day }</span>
                </div>
              )
            }) }
        </div>
      </div>
    </div>
  )
}

export default Calendar;
