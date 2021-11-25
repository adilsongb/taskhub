import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={ <Dashboard /> } />
        <Route exact path="/" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
