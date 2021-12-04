import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../context/context';

function Home() {
  const navigate = useNavigate();
  const { user, loginForGoogle } = useContext(appContext);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate])

  return (
    <main>
      <h1>Home</h1>
      <button onClick={ loginForGoogle }>Login com o Google</button>
    </main>
  );
}

export default Home;
