import { useContext } from 'react';
import appContext from '../context/context';
import Header from '../components/Header';
import DailyTask from '../components/DailyTask';
import Loading from '../components/Loading';
import Calendar from '../components/Calendar';

function Dashboard() {
  const { user, viewCalendar } = useContext(appContext);
  
  if (!user) {
    return <div className="cont-full" style={ { height: '100%' } }><Loading /></div>;
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
