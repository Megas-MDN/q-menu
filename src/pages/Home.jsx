import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';
import TableCard from '../components/TableCard';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const store = useRestaurant();
  const navigate = useNavigate();

  const checkToken = () => {
    if (!store.token) return navigate('/login');
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <div className='bbb h-full w-full place-self-start'>
      <header className=''>
        <h1 className='text-3xl p-2'>Dashboard: {store.name}</h1>
      </header>
      <ul className='bb'>
        {store.tables.map((el) => (
          <TableCard key={el.hash} {...el} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
