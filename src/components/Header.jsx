import { useContext } from 'react';
import appContext from '../context/context';
import extendLogo from '../images/ext-logo-comp.png';
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

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
  const { displayName, email, photoURL } = user;

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
      <div className='logo-container'>
        <img src={ extendLogo } className="logo-header" alt="logo" />
      </div>
      <div className="header-control">
        <button onClick={prevDay} className="btn-header arrow">
          <BsCaretLeftFill />
        </button>
        <button onClick={ showCalendar } className="btn-header">
          {`${formatDate(date.day)}/${formatDate(date.month)}/${date.year}`}
        </button>
        <button onClick={nextDay} className="btn-header arrow">
          <BsCaretRightFill />
        </button>
      </div>
      <div className="user">
        <div className='user-photo'>
          <img src={ photoURL } alt="profile photo" />
        </div>
        <div>
          <span className="user-name">{displayName}</span>
          <br />
          <span className="user-email">{email}</span>
          <button onClick={signOutApp} style={ { display: 'none' } }>Sair</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
