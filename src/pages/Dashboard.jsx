import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../context/context';
import Header from '../components/Header';
import DailyTask from '../components/DailyTask';
import Loading from '../components/Loading';
import Calendar from '../components/Calendar';

function Dashboard() {
  const navigate = useNavigate();
  const { user, viewCalendar } = useContext(appContext);

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        navigate('/');
      }
    }, 5000);
  }, [user, navigate])
  
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
