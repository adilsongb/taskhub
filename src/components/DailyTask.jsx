import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import Loading from './Loading';
import NewTask from './NewTask';
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
  }, [date, user, loading, setLoading])

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

    return (
      <section className="status-controler">
        <div className="status-progress">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray={ `${percentComp * dayStatus.completedTasks}, 100` }
              visibility={ dayStatus.completedTasks === 0 ? 'hidden' : '' }
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <h2>{ `${dayStatus.completedTasks} / ${dayStatus.totalTasks}` }</h2>
        </div>
        <button
          className="btn-new-task"
          onClick={ viewContainer }
        >
          Nova task
        </button>
      </section>
    )
  }

  async function checkTask({ target }, index) {
    target.disabled = true;
    const codDate = `${date.day}${date.month}${date.year}`;
    const docRef = doc(dataBase, 'users', user.uid, 'tasks', codDate);
    const count = (target.checked ? tasks.dayStatus.completedTasks + 1 : tasks.dayStatus.completedTasks - 1);
    const updateTask = tasks.tasksDay[index];
    updateTask.status = target.checked;
    await updateDoc(docRef, {
      "dayStatus.completedTasks": count,
      "tasksDay": tasks.tasksDay
    });
    const docSnap = await getDoc(docRef);
    setTasks(docSnap.data());
    target.disabled = false;
  }

  function renderTasks() {
    return (
      <>
        <section className="container-tasksday">
          {
            tasks.tasksDay.map((task, i) => (
              <div key={ i } className="task">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={ task.status }
                    onChange={ (e) => checkTask(e, i) }
                  />
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

  if (loading) {
    return <div className="cont-full"><Loading /></div>;
  }

  return (
    <section className="container-main">
      { tasks ? renderTasks() : renderNoTasks() }
      { viewFormTask ? <NewTask closeForm={ viewContainer } /> : '' }
    </section>
  )
}

export default DailyTask;
