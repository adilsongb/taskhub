import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import { MdOutlineAdd } from "react-icons/md";
import Loading from './Loading';
import NewTask from './NewTask';
import ilustrationTasks from '../images/tasks.png';
import ilustrationCalendar from '../images/date_picker.png';
import '../styles/Dashboard.css';

function DailyTask() {
  const { date, user, setLoading, loading, setViewFormTask, viewFormTask } = useContext(appContext);
  const [tasks, setTasks] = useState();
  const [pastDate, setPastDate] = useState(true);
  const dateNow = new Date();

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

  useEffect(() => {
    const monthNow = dateNow.getMonth() + 1;

    if (date.year > dateNow.getFullYear()) {
      setPastDate(false);
    } else if (date.year === dateNow.getFullYear() && date.month > monthNow) {
      setPastDate(false);
    } else if (date.year === dateNow.getFullYear() && date.month === monthNow) {
      if (date.day > dateNow.getDate()) {
        setPastDate(false);
      } else if (date.day === dateNow.getDate()) {
        setPastDate(false);
      } else {
        setPastDate(true);
      }
    } else {
      setPastDate(true);
    }
  }, [date]) // eslint-disable-line react-hooks/exhaustive-deps

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
        {!pastDate && (
          <button
            className="btn-new-task"
            onClick={ viewContainer }
          >
            Nova tarefa
          </button>
        )}
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
    const addTaskButton = (pastDate) ? 'none' : '';

    return (
      <>
        <section className="container-tasksday">
          <h2 className="header-day">
            Tarefas do dia
            <button onClick={ viewContainer } style={ { display: addTaskButton } }>
              <MdOutlineAdd />
            </button>
          </h2> 
          {
            tasks.tasksDay.map((task, i) => (
              <div key={ i } className="task">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={ task.status }
                    onChange={ (e) => checkTask(e, i) }
                    disabled={ pastDate }
                  />
                  <span className="checkmark"></span>
                </label>
                <span className="title-task">{ task.title }</span>
              </div>
            ))
          }
          {/* <h2>Hábitos</h2> */}
        </section>
        <aside>
          { renderControl() }
          {/* <section className="announcement">
          </section> */}
        </aside>
      </>
    )
  }

  function renderNoTasks() {
    if (!pastDate) {
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
