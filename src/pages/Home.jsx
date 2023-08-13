import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const state = useRestaurant();
  const navigate = useNavigate();

  const checkToken = () => {
    if (!state.token) return navigate('/login');
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) return <div>Loading</div>;

  return <div>Home</div>;
};

export default Home;
