import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/:restaurant/:table' element={<Table />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
