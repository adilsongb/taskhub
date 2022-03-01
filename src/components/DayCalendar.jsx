function DayCalendar({ day, dateMod, changeDate }) {
  if (day === new Date().getDate() && (dateMod.month - 1) === new Date().getMonth() && dateMod.year === new Date().getFullYear()) {
    return ( 
      <div>
        <span className="today" id={ day } onClick={ () => changeDate(day)}>
          { day }
        </span>
      </div>
    );
  }

  return (
    <div>
      <span id={ day } onClick={ () => changeDate(day) }>{ day }</span>
    </div>
  )
}

export default DayCalendar;
