import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../store/useRestaurant';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { v1 } from 'uuid';
import fetchService from '../service/fetchService';
import Menu from '../components/Menu';

const EditMenu = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const [isFetching, setIsFetching] = useState(false);
  // const [reFetching, setReFetching] = useState(false);
  const navigate = useNavigate();
  const store = useRestaurant();
  if (!store.menu) {
    store.resetAll();
    navigate('/login');
  }

  const handleEdit = async (obj) => {
    console.log(obj, 'handleEdit');
    const res = await fetchService.putApi({
      url: `/${store.route}/menu/${obj.id}`,
      data: obj,
      auth: store.token,
    });
    const index = store.menu.findIndex((el) => el.id === obj.id);
    store.editItem({
      index,
      item: obj,
    });
    console.log(res, 'Response to edit');
  };
  const handleDelete = async (id) => {
    console.log(id, 'handleDelete');
    const res = await fetchService.deleteApi({
      url: `/${store.route}/menu/${id}`,
      auth: store.token,
    });
    const index = store.menu.findIndex((el) => el.id === id);
    store.removeItem(index);
    console.log(res, 'Response to edit');
  };

  const createItem = ({ price, name, pic, ingredients }) => {
    if (!price || !name || !pic || !ingredients) {
      return { erro: true, message: 'Preencha todos os campos' };
    }
    const id = v1();
    const item = {
      id,
      price: isNaN(+price) ? 0 : +price,
      name,
      pic,
      ingredients,
    };
    console.log('createItem', item, store.token);
    setOpen(false);
    store.addItem(item);
    fetchService
      .postApi({
        url: `/add-to-menu`,
        data: item,
        auth: store.token,
      })
      .then((r) => console.log(r, 'response'));
    return {};
  };

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
            save={handleEdit}
            deleteItem={handleDelete}
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
            <Menu
              editMode={true}
              save={createItem}
              deleteItem={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMenu;
