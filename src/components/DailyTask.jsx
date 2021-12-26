import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import Loading from './Loading';
import ilustrationChecklist from '../images/undraw_Checklist.png';
import '../styles/Dashboard.css';

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
      <section className="container-tasksday">
        {
          tasks.tasksDay.map((task, i) => (
            <div key={ i } className="task">
              <label className="checkbox">
                <input type="checkbox" defaultChecked={ task.status } />
                <span className="checkmark"></span>
              </label>
              <span className="title-task">{ task.title }</span>
            </div>
          ))
        }
      </section>
    )
  }

  function renderNoTasks() {
    return <img src={ ilustrationChecklist } alt="" width={'500px'} />
  }

  function renderControl() {
    const { dayStatus } = tasks;
    const percentComp = 100 / dayStatus.totalTasks;

    if (dayStatus.completedTasks === 0) {
      return (
        <section className="status-controler">
          <div className="status-progress">
            <svg viewBox="0 0 36 36" class="circular-chart orange">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <h2>{ `${dayStatus.completedTasks} / ${dayStatus.totalTasks}` }</h2>
          </div>
          <button className="btn-new-task">Nova task</button>
        </section>
      )
    }

    return (
      <section className="status-controler">
        <div className="status-progress">
          <svg viewBox="0 0 36 36" class="circular-chart orange">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
              stroke-dasharray={ `${percentComp * dayStatus.completedTasks}, 100` }
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <h2>{ `${dayStatus.completedTasks} / ${dayStatus.totalTasks}` }</h2>
        </div>
        <button className="btn-new-task">Nova task</button>
      </section>
    )
  }

  return (
    <section className="container-main">
      { tasks ? renderTasks() : renderNoTasks() }
      <aside>
        { tasks ? renderControl() : '' }
        <section className="announcement"></section>
      </aside>
    </section>
  )
}

export default DailyTask;
