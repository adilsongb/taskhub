import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from './context';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { providerGoogle } from '../services/firebase';

function Provider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
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
        console.log(user.uid);
      }).catch((error) => {
        console.error(error);
      });
  }

  const contextValues = {
    user,
    setUser,
    loginForGoogle,
    signOutApp,
  };

  return (
    <appContext.Provider value={ contextValues }>
      { children }
    </appContext.Provider>
  )
}

export default Provider;
