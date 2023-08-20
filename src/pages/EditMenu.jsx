import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';
// import fetchService from '../service/fetchService';
import Menu from '../components/Menu';

const EditMenu = () => {
  const [loading, setLoading] = useState(true);
  // const [isFetching, setIsFetching] = useState(false);
  // const [reFetching, setReFetching] = useState(false);
  const navigate = useNavigate();
  const store = useRestaurant();
  if (!store.menu) {
    store.resetAll();
    navigate('/login');
  }

  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    if (store.menu) setLoading(false);
    console.log(store.menu);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className=''>
      <div className='navigate-container p-2 flex justify-around'>
        <button type='button' className='www' onClick={() => navigate('/')}>
          Home
        </button>
        <button type='button' className='www'>
          Add
        </button>
      </div>
      <ul className=' flex flex-col gap-3 px-1 py-2'>
        {store.menu.map((item, i) => (
          <Menu
            key={i + item.id}
            {...item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            save={() => {}}
          />
        ))}
      </ul>
    </div>
  );
};

export default EditMenu;
