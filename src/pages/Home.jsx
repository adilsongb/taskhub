import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import appContext from '../context/context';
import logo from '../images/ext-logo-comp.png';
import ilustration1 from '../images/home_1.svg';
import ilustration2 from '../images/home_2.svg';
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
      <main className="main-home">
        <section className="presentation">
          <section className="content">
            <h1>Gerencie suas tarefas diárias</h1>
            <p>TaskHub registra todas as suas tarefas do dia em um só lugar para uma melhor organização pessoal.</p>
            <button onClick={ loginForGoogle }>
              <FaGoogle />
              Login/Registre-se com o Google
            </button>
          </section>
          <section className="content-images">
            <img src={ ilustration1 } alt="Illustration" />
            <img src={ ilustration2 } alt="Illustration" />
          </section>
        </section>
        <footer>
          <span>Developed by Adilson Gabriel</span>
        </footer>
      </main>
    </>
  );
}

export default Home;
