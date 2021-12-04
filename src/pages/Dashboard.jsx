import { useContext } from 'react';
import appContext from '../context/context';

function Dashboard() {
  const { user, signOutApp } = useContext(appContext);
  
  if (!user) {
    return (
      <h1>Carregando...</h1>
    );
  }

  const { displayName, email } = user;
  return (
    <main>
      <header>
        <h1>TASKHUB</h1>
        <div>
          <button>Voltar</button>
          <button>Data</button>
          <button>Proximo</button>
        </div>
        <div>
          <span>{ displayName }</span>
          <br />
          <span>{ email }</span>
          <button onClick={ signOutApp }>Sair</button>
        </div>
      </header>
    </main>
  );
}

export default Dashboard;
