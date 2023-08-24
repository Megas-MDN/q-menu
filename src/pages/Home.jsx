import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';
import TableCard from '../components/TableCard';
import useSocket from '../hooks/useSocket';
import fetchService from '../service/fetchService';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [reFetching, setReFetching] = useState(false);
  const store = useRestaurant();
  const navigate = useNavigate();
  const { data } = useSocket({ route: store.route, table: null });

  const fetchTables = async () => {
    if (isFetching) {
      setReFetching(true);
      return;
    }
    setIsFetching(true);
    const res = await fetchService.getApi({
      url: `/table`,
      auth: store.token,
    });
    console.log(res, 'fetchTables', reFetching, 'reFetching');
    store.setTables(res.tables);
    setIsFetching(false);

    if (reFetching) {
      setReFetching(false);
      fetchTables();
    }
  };

  const checkToken = () => {
    if (!store?.token) return navigate('/login');
    setLoading(false);
    fetchTables();
  };

  const clearTable = async (hash) => {
    const res = await fetchService.deleteApi({
      url: `/table/${hash}`,
      auth: store.token,
    });
    console.log(res, 'ClearTable');
    fetchTables();
  };

  const goExit = () => {
    store.resetAll();
    navigate('/login');
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      fetchTables();
    }
  }, [data]);

  if (loading) return <div>Loading</div>;

  return (
    <div className=' h-full w-full place-self-start'>
      <header className='flex justify-around p-1 items-center'>
        <h1 className='text-3xl p-2'>Dashboard: {store.name}</h1>
        <button type='button' className='www h-fit' onClick={() => goExit()}>
          Sair
        </button>
      </header>
      <div className='button-container flex justify-around p-2'>
        <button type='button' className='www' onClick={() => navigate('/menu')}>
          Menu
        </button>
        <button type='button' className='www' onClick={() => fetchTables()}>
          Refresh
        </button>
        <button
          type='button'
          className='www'
          onClick={() => navigate('/table')}
        >
          Mesas
        </button>
      </div>
      <ul className=' grid max-sm:grid-cols-1 grid-cols-2 gap-2 p-3'>
        {store.tables.map((el) => (
          <TableCard
            key={el.hash}
            {...el}
            clearTable={clearTable}
            route={store.route}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
