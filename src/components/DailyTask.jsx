import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import Loading from './Loading';
import ilustrationChecklist from '../images/undraw_Checklist.png';

function DailyTask() {
  const { date, user, setLoading, loading } = useContext(appContext);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    async function tasksOfDay() {
      const codDate = `${date.day}${date.month}${date.year}`;
      const userRef = doc(dataBase, 'users', user.uid, 'tasks', codDate);
      const docSnap = await getDoc(userRef);
      console.log(docSnap.data());
      setTasks(docSnap.data());
      setLoading(false);
    }
    tasksOfDay();
  }, [date, user, setLoading])

  if (loading) {
    return <div className="cont-full"><Loading /></div>;
  }

  function renderTasks() {
    return (
      <div className="container-taskday">
        {
          tasks.tasksDay.map((task, i) => (
            <div key={ i } className="task">
              <label className="checkbox">
                { task.title }
                <input type="checkbox" checked={ task.status }/>
                <span className="checkmark"></span>
              </label>
            </div>
          ))
        }  
      </div>
    )
  }

  function renderNoTasks() {
    return <img src={ ilustrationChecklist } alt="" width={'500px'} />
  }

  return (
    <section className="container-main">
      { tasks ? renderTasks() : renderNoTasks() }
    </section>
  )
}

export default DailyTask;
