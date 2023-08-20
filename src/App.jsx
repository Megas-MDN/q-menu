import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import NotFound from './pages/NotFound';
import EditMenu from './pages/EditMenu';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/menu' element={<EditMenu />} />
      <Route path='/:restaurant/:table' element={<Table />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
