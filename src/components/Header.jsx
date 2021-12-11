import { useContext } from 'react';
import appContext from '../context/context';
import extendLogo from '../images/ext-logo-comp.png';

function Header() {
  const {
    user,
    signOutApp,
    date,
    prevDay,
    nextDay,
    viewCalendar,
    setViewCal,
  } = useContext(appContext);
  const { displayName, email } = user;

  function formatDate(num) {
    if (`${num}`.length === 1) {
      return `0${num}`;
    }
    return num;
  }

  function showCalendar() {
    if (!viewCalendar) {
      setViewCal(true);
      console.log('Mostrei o calendario');
    } else {
      setViewCal(false);
      console.log('Não mostrar o calendario');
    }
  }

  return (
    <header>
      <img src={ extendLogo } alt="logo" />
      <div>
        <button onClick={prevDay}>Voltar</button>
        <button onClick={ showCalendar }>
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
