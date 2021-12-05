import { useContext } from 'react';
import appContext from '../context/context';
import Header from '../components/Header';
import DailyTask from '../components/DailyTask';

function Dashboard() {
  const { user } = useContext(appContext);
  
  if (!user) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <main>
      <Header />
      <DailyTask />
    </main>
  );
}

export default Dashboard;
