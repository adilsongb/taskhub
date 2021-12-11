import { useContext } from 'react';
import appContext from '../context/context';
import Header from '../components/Header';
import DailyTask from '../components/DailyTask';
import Calendar from '../components/Calendar';

function Dashboard() {
  const { user, viewCalendar } = useContext(appContext);
  
  if (!user) {
    return (
      <h1>Carregando...</h1>
    );
  }

  return (
    <main>
      <Header />
      <DailyTask />
      { viewCalendar ? <Calendar /> : '' }
    </main>
  );
}

export default Dashboard;
