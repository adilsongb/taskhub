import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import Loading from './Loading';
import NewTask from './NewTask';
// import ilustrationChecklist from '../images/undraw_Checklist.png';
import ilustrationTasks from '../images/tasks.png';
import ilustrationCalendar from '../images/date_picker.png';
import '../styles/Dashboard.css';

function DailyTask() {
  const { date, user, setLoading, loading, setViewFormTask, viewFormTask } = useContext(appContext);
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

  function viewContainer() {
    if (viewFormTask) {
      setViewFormTask(false);
    } else {
      setViewFormTask(true);
    }
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

  function renderTasks() {
    return (
      <>
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
        <aside>
          { tasks ? renderControl() : '' }
          <section className="announcement">
          </section>
        </aside>
      </>
    )
  }

  function renderNoTasks() {
    const dateNow = new Date();

    if (date.year > dateNow.getFullYear()) {
      return (
        <div className="noTasks">
          <img src={ ilustrationTasks } alt="" width={'350px'} />
          <h1>Planeje este dia!</h1>
          <button onClick={ viewContainer }>Adicionar Task</button>
        </div>
      )
    }

    if (date.year === dateNow.getFullYear() && (date.day >= dateNow.getDate() && date.month >= dateNow.getMonth() + 1)) {
      return (
        <div className="noTasks">
          <img src={ ilustrationTasks } alt="" width={'350px'} />
          <h1>Planeje este dia!</h1>
          <button onClick={ viewContainer }>Adicionar Task</button>
        </div>
      )
    }

    return (
      <div className="noTasks">
        <img src={ ilustrationCalendar } alt="" width={'350px'} />
        <h1>Nenhuma Task foi feita nesse dia</h1>
      </div>
    )
  }

  return (
    <section className="container-main">
      { tasks ? renderTasks() : renderNoTasks() }
      { viewFormTask ? <NewTask cancelForm={ viewContainer } /> : '' }
    </section>
  )
}

export default DailyTask;
