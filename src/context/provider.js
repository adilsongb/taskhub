import { useState } from 'react';
import appContext from './context';

function Provider({ children }) {
  const [user, setUser] = useState();

  const contextValues = {
    user,
    setUser,
  };

  return (
    <appContext.Provider value={ contextValues }>
      { children }
    </appContext.Provider>
  )
}

export default Provider;
