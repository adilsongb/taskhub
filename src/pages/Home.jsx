import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../context/context';
import logo from '../images/ext-logo-comp.png';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const { user, loginForGoogle } = useContext(appContext);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate])

  return (
    <>
      <header className="header-home">
        <img src={ logo } alt="Logo TaskHub" />
      </header>
      <main>
        <button onClick={ loginForGoogle }>Login com o Google</button>
      </main>
    </>
  );
}

export default Home;
