import { useContext } from 'react';
import appContext from '../context/context';

function Header() {
  const { user, signOutApp, date, prevDay, nextDay, tasksOfDay } = useContext(appContext);
  const { displayName, email } = user;

  function formatDate(num) {
    if (`${num}`.length === 1) {
      return `0${num}`;
    }
    return num;
  }

  return (
    <header>
      <h1>TASKHUB</h1>
      <div>
        <button onClick={prevDay}>Voltar</button>
        <button onClick={ tasksOfDay }>
          {`${formatDate(date.day)}/${formatDate(date.month)}/${date.year}`}
        </button>
        <button onClick={nextDay}>Proximo</button>
      </div>
      <div>
        <span>{displayName}</span>
        <br />
        <span>{email}</span>
        <button onClick={signOutApp}>Sair</button>
      </div>
    </header>
  )
}

export default Header;
