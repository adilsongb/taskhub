import { useContext } from 'react';
import appContext from '../context/context';
import extendLogo from '../images/ext-logo-comp.png';
import LogoMobile from '../images/logo-mobile.png';
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import '../styles/Header.css';

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
    } else {
      setViewCal(false);
    }
  }

  function viewOptions() {
    const divPanel = document.getElementById('float-panel');

    if (!divPanel.style.height) {
      divPanel.style.height = '158px';
    } else if (divPanel.style.height === '158px'){
      divPanel.style.height = '50px';
    } else {
      divPanel.style.height = '158px';
    }
  }

  return (
    <header className="header-dashboard">
      <div className='logo-container'>
        <img src={ extendLogo } className="logo-header" alt="logo" />
        <img src={ LogoMobile } className="logo-header-mobile" alt="logo" />
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
      <div className="base-cont-user">
        <div className="float-panel" id="float-panel">
          <div className="user" onClick={ viewOptions }>
            <div className='user-photo'>
              <img src={ photoURL } alt="profile user" />
            </div>
            <div>
              <span className="user-name">{displayName}</span>
              <br />
              <span className="user-email">{email}</span>
            </div>
          </div>
          <button className="btn-menu-user" disabled="disabled">Estatísticas</button>
          <button className="btn-menu-user" disabled="disabled">Configurações</button>
          <button className="btn-menu-user" onClick={ signOutApp } >Sair</button>
        </div>
      </div>
      <div className="user-mobile">
        <img src={ photoURL } alt="profile user" />
      </div>
    </header>
  )
}

export default Header;
