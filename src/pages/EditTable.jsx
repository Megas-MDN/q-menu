import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import fetchService from '../service/fetchService';
import TableEdit from '../components/TableEdit';
import NewTable from '../components/NewTable';

const EditTable = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const [isFetching, setIsFetching] = useState(false);
  // const [reFetching, setReFetching] = useState(false);
  const navigate = useNavigate();
  const store = useRestaurant();

  useEffect(() => {
    if (!store.tables || !store.token) {
      store.resetAll();
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, []);

  const handleDeleteTable = async ({ index, hash }) => {
    const res = await fetchService.deleteApi({
      url: `/${store.route}/table/${hash}`,
      auth: store.token,
    });
    console.log(res);
    store.removeTable(index);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className='btn-container flex justify-around p-2'>
        <button type='button' className='www' onClick={() => navigate('/')}>
          Home
        </button>
        <button type='button' className='www' onClick={() => setOpen(true)}>
          Add
        </button>
      </div>
      <ul className='tables-container wx-auto flex flex-col items-center gap-2'>
        {store.tables.map((t, i) => (
          <TableEdit
            key={t.hash}
            {...t}
            route={store.route}
            removeTable={handleDeleteTable}
            index={i}
          />
        ))}
      </ul>
      {open && (
        <NewTable
          setOpen={setOpen}
          token={store.token}
          addTable={store.addTable}
        />
      )}
    </div>
  );
};

export default EditTable;
