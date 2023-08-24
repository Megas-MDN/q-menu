import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Table from './pages/Table';
import NotFound from './pages/NotFound';
import EditMenu from './pages/EditMenu';
import EditTable from './pages/EditTable';
import QrCodeTable from './pages/QrCodeTable';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/menu' element={<EditMenu />} />
      <Route path='/table' element={<EditTable />} />
      <Route
        path='/qr-code-table/:restaurant/:table'
        element={<QrCodeTable />}
      />
      <Route path='/:restaurant/:table' element={<Table />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
