import { useContext, useEffect, useState } from 'react';
import appContext from '../context/context';
import { doc, getDoc } from 'firebase/firestore';
import { dataBase } from '../services/firebase';

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
    return <h1>Buscando tasks...</h1>
  }

  function renderTasks() {
    return tasks.tasksDay.map((task, i) => (
      <div key={ i }>
        <input type="checkbox" name="" id="" />
        <h2>{ task.title }</h2>
      </div>
    ))
  }

  return (
    <section>
      <h1>{ `Day ${date.day}` }</h1>
      { tasks ? renderTasks() : <h2>Nenhuma task</h2> }
    </section>
  )
}

export default DailyTask;
