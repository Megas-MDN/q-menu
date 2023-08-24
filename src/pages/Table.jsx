import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../service/index';
import Item from '../components/Item';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { RiRestaurantLine } from 'react-icons/ri';
import CartItem from '../components/CartItem';
import { useCommand } from '../store/useCommand';
import ModalCommand from '../components/ModalCommand';
import useSocket from '../hooks/useSocket';

const Table = () => {
  const [loading, setLoading] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [openSended, setOpenSended] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);
  const [myMenu, setMyMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { restaurant, table } = useParams();
  const commandStore = useCommand();
  const { sendCommand } = useSocket({ route: restaurant, table });

  const fetchMenu = async () => {
    const res = await Api.getMenu({ restaurant });
    if (res.error) {
      return navigate('/NotFound');
    }

    setMyMenu(res.menu);

    setLoading(false);
  };

  const addCart = (item) => {
    const prod = cart.find((el) => el.id === item.id);
    if (prod) return;
    setCart((prev) => [{ ...item, qtd: 1 }, ...prev]);
  };

  const subtractCart = (id) => {
    const prod = cart.find((el) => el.id === id);
    if (!prod) return;
    if (prod.qtd - 1 > 0) prod.qtd -= 1;
    setCart([...cart]);
  };

  const plusCart = (id) => {
    const prod = cart.find((el) => el.id === id);
    if (!prod) return;
    prod.qtd += 1;
    setCart([...cart]);
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((el) => el.id !== id));
  };

  const sendRequest = async () => {
    setOpenCart(false);
    setOpenSended(true);
    const res = await Api.sendRequest({ restaurant, table, cart });
    console.log(res, 'response after create command');
    commandStore.addCommand(cart);
    sendCommand({ table, orderNumber: commandStore.commands.length });
    setCart([]);
  };

  const checkCommand = () => {
    const ONE_DAY = 86400000;
    if (commandStore.commands.length > 0) {
      const oldDate = new Date(commandStore.commands[0].date);
      const lastDay =
        oldDate === 'Invalid Date' ? new Date(1).getTime() : oldDate.getTime();
      const today = new Date().getTime();

      if (today - lastDay > ONE_DAY) {
        commandStore.resetAll();
      }
    }
    commandStore.setTable(table);
  };

  useEffect(() => {
    fetchMenu();
    checkCommand();
  }, []);

  if (loading) return <div>Loading</div>;
  return (
    <div className='relative mx-auto flex flex-col items-center'>
      <header className='header-container flex justify-between items-top p-2 fixed w-[300px] backdrop-blur-sm bg-zinc-700 bg-opacity-30 top-0'>
        <h1 className='title text-3xl'>Menu</h1>
        {commandStore.commands.length > 0 && (
          <button
            onClick={() => setOpenCommand((prev) => !prev)}
            type='button'
            className='px-2 py-1 focus:outline-none border border-zinc-600 h-fit self-center focus:bg-zinc-600'
          >
            Comandas
          </button>
        )}
        <div className='cart-container relative'>
          {cart.length > 0 && (
            <p className='counter px-1 absolute bb rounded-full bg-red-900 border-none right-[-5px] top-[-5px]'>
              {cart.length}
            </p>
          )}
          <button
            type='button'
            className='cart bg-green-600 bg-opacity-40 py-1 px-3'
            onClick={() => setOpenCart((prev) => !prev)}
          >
            <PiShoppingCartSimpleBold
              size='2rem'
              style={{ color: 'white', fontSize: '2em' }}
            />
          </button>
        </div>
      </header>
      {/* <hr className='line border border-zinc-700' /> */}
      <ul className='items-container flex flex-col gap-2 mt-16'>
        {myMenu.map((item, i) => (
          <Item key={item?.name || i} {...item} addCart={addCart} />
        ))}
      </ul>
      {openCart && (
        <div className='final-cart-container fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-1'>
          <div className='modal-container bg-zinc-500 bg-opacity-30 py-2'>
            <header className='header-container flex items-center px-3 w-[350px] justify-between py-1'>
              <h3>Comanda</h3>
              <button
                className='btn-close transition ease-in delay-100 duration-300  hover:text-neutral-800 hover:bg-white p-0'
                type='button'
                onClick={() => setOpenCart(false)}
              >
                <AiFillCloseSquare size={'1.8rem'} />
              </button>
            </header>
            {cart.length > 0 && (
              <ul className='internal-cart flex flex-col gap-1 py-2 max-h-[400px] overflow-y-auto'>
                {cart.map((el, i) => (
                  <CartItem
                    {...el}
                    key={el.id + i}
                    removeItem={removeItem}
                    subtractCart={subtractCart}
                    plusCart={plusCart}
                  />
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <>
                <div className='total-price bg-zinc-900 bg-opacity-50'>
                  <p className='price font-semibold items-center flex justify-end py-2 w-[250px] mx-auto'>
                    Total:{' '}
                    {cart
                      .reduce((total, el) => {
                        total += el.price * el.qtd;
                        return total;
                      }, 0)
                      .toFixed(2)}{' '}
                    <span className='cifra text-[12px] h-[20px] w-[20px] flex justify-center items-start'>
                      R$
                    </span>
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => sendRequest()}
                  className='bg-green-700 px-4 py-2 flex mx-auto items-center gap-3 mt-1'
                >
                  Peça agora
                  <BsCartCheck size={'1.5rem'} />
                </button>
              </>
            )}
            {cart.length === 0 && (
              <div className='p-1 '>Escolha algo do menu</div>
            )}
          </div>
        </div>
      )}
      {openSended && (
        <div className='request-sended fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-1'>
          <div className='modal-sended bg-zinc-500 bg-opacity-30 py-2 w-[350px] flex flex-col justify-center gap-3'>
            <header className='header-container flex items-center px-3 w-[350px] justify-between py-1 bg-zinc-600'>
              <h3>Comanda enviada</h3>
              <button
                className='btn-close transition ease-in delay-100 duration-300  hover:text-neutral-800 hover:bg-white p-0'
                type='button'
                onClick={() => setOpenSended(false)}
              >
                <AiFillCloseSquare size={'1.8rem'} />
              </button>
            </header>
            <RiRestaurantLine
              size={'4rem'}
              className=' rounded-full bg-zinc-500 p-1 bg-opacity-50 border border-zinc-500 mx-auto'
            />
            <p className=' break-words w-full bg-zinc-500 bg-opacity-50 px-2'>
              Logo, um dos nossos garçons estará trazendo o seu pedido.
            </p>
          </div>
        </div>
      )}
      {openCommand && <ModalCommand setOpenCommand={setOpenCommand} />}
    </div>
  );
};

export default Table;
