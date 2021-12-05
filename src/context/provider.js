import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from './context';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { dataBase, providerGoogle } from '../services/firebase';
import useDate from '../hooks/useDate';

function Provider({ children }) {
  const navigate = useNavigate();
  const [modPrevDate, modNextDate] = useDate();
  const [user, setUser] = useState();
  const [date, setDate] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    getDateNow();
  }, [])

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      getDBUser(user);
    } else {
      setUser(null);
    }
  });

  function signOutApp() {
    signOut(auth).then(() => {
      console.log('Saiu');
      navigate('/');
    }).catch((error) => {
      console.error(error);
    });
  }

  function loginForGoogle() {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const user = result.user;
        getDBUser(user);
      }).catch((error) => {
        console.error(error);
      });
  }

  async function getDBUser(user) {
    const userRef = doc(dataBase, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      console.log("Usuario não encontrado no Banco de dados! Criando...");
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
      });
    }
  }

  function getDateNow() {
    const dateNow = new Date();
    const day = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    setDate({ day, month, year });
  }

  async function tasksOfDay() {
    const userRef = doc(dataBase, 'users', user.uid, 'tasks', '4122021');
    const docSnap = await getDoc(userRef);
    console.log(docSnap.data());
  }

  function prevDay() {
    const updateDate = modPrevDate(date);
    setDate(updateDate);
  }

  function nextDay() {
    const updateDate = modNextDate(date);
    setDate(updateDate);
  }

  const contextValues = {
    user,
    date,
    setUser,
    loginForGoogle,
    signOutApp,
    setDate,
    prevDay,
    nextDay,
    tasksOfDay,
  };

  return (
    <appContext.Provider value={ contextValues }>
      { children }
    </appContext.Provider>
  )
}

export default Provider;
