import { useEffect, useState, useContext } from 'react/cjs/react.development';
import { doc, getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import appContext from '../context/context';

function DayCalendar({ day, dateMod, changeDate }) {
  const [styleDay, setStyleDay] = useState('');
  const { user } = useContext(appContext);

  useEffect(() => {
    async function checkDay() {
      setStyleDay('');
      const codDate = `${day}${dateMod.month}${dateMod.year}`;
      const userRef = doc(dataBase, 'users', user.uid, 'tasks', codDate);
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        setStyleDay('xp2');
      }
    }
  
    checkDay();
  }, [dateMod]) // eslint-disable-line react-hooks/exhaustive-deps

  if (day === new Date().getDate() && (dateMod.month - 1) === new Date().getMonth() && dateMod.year === new Date().getFullYear()) {
    return ( 
      <div>
        <span className={ `today ${ styleDay }` } id={ day } onClick={ () => changeDate(day)}>
          { day }
        </span>
      </div>
    );
  }

  return (
    <div>
      <span className={ styleDay } id={ day } onClick={ () => changeDate(day) }>{ day }</span>
    </div>
  )
}

export default DayCalendar;
