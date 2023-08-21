import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import fetchService from '../service/fetchService';
import Menu from '../components/Menu';

const EditMenu = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
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
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className=''>
      <div className='navigate-container p-2 flex justify-around'>
        <button type='button' className='www' onClick={() => navigate('/')}>
          Home
        </button>
        <button type='button' className='www' onClick={() => setOpen(true)}>
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
            deleteItem={() => {}}
          />
        ))}
      </ul>
      {open && (
        <div className='commands-container fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-1'>
          <div className='modal-command bg-zinc-500 bg-opacity-30 w-[350px] flex flex-col justify-center gap-3'>
            <button
              onClick={() => setOpen(false)}
              type='button'
              className='border border-zinc-400 self-end mr-2 my-2'
            >
              <AiOutlineClose />
            </button>
            <Menu editMode={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMenu;
