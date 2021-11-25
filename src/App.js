import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from './context/provider';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route exact path="/dashboard" element={ <Dashboard /> } />
          <Route exact path="/" element={ <Home /> } />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
