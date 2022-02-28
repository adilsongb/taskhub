import { useContext, useState } from 'react';
import appContext from '../context/context';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { dataBase } from '../services/firebase';
import Loading from './Loading';
import '../styles/Formfull.css';

function NewTask({ closeForm }) {
  const [task, setTask] = useState({ title: '', describe: '', status: false });
  const [submitTask, setSubmitTask] = useState(false);
  const { user, date, setLoading } = useContext(appContext);

  function handleChange({ target }) {
    setTask({
      ...task,
      [target.name]: target.value
    });
  }

  async function submitNewTask(event) {
    setSubmitTask(true);
    event.preventDefault();
    console.log(task);
    const codDate = `${date.day}${date.month}${date.year}`;
    const docRef = doc(dataBase, 'users', user.uid, 'tasks', codDate);

    const data = await getDoc(docRef);

    if (data.data()) {
      updateDoc(docRef, {
        "dayStatus.totalTasks": increment(1),
        "tasksDay": arrayUnion(task)
      })
        .then(() => {
          setSubmitTask(false);
          console.log('Task adicionada com sucesso!');
          closeForm();
          setLoading(true);
        })
        .catch((erro) => {
          setSubmitTask(false);
          console.log(erro);
        });
    } else {
      setDoc(docRef, {
        dayStatus: { completedTasks: 0, totalTasks: 1 },
        tasksDay: [ task ]
      })
        .then(() => {
          setSubmitTask(false);
          console.log('Task adicionada com sucesso!');
          closeForm();
          setLoading(true);
        })
        .catch((erro) => {
          setSubmitTask(false);
          console.log(erro);
        });
    }
  }

  if (submitTask) {
    return (
      <div className="full-container">
        <div className="loading-submit">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="full-container">
      <form className="form-newtask">
        <h2>Nova Tarefa</h2>
        <input
          type="text"
          placeholder="Título"
          name="title"
          onChange={ handleChange }
          autoComplete='off'
        />
        <textarea
          placeholder="Detalhes"
          cols="30"
          rows="10"
          name="describe"
          onChange={ handleChange }
        >
        </textarea>
        <div>
          <button
            type="button"
            className="btn-cancel"
            onClick={ closeForm }
          >
            Cancelar
          </button>
          <button
            className="btn-add"
            onClick={ submitNewTask }
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTask;
