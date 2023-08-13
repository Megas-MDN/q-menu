import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../service/index';
import Item from '../components/Item';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import CartItem from '../components/CartItem';

const Table = () => {
  const [loading, setLoading] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [myMenu, setMyMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { restaurant, table } = useParams();

  const fetchMenu = async () => {
    const res = await Api.getMenu({ restaurant });
    console.log(res);
    if (res.error) {
      return navigate('/NotFound');
    }

    setMyMenu(res.menu);

    setLoading(false);
  };

  const addCart = (item) => {
    const prod = cart.find((el) => el.id === item.id);
    if (!prod) {
      setCart((prev) => [{ ...item, qtd: 1 }, ...prev]);
      return;
    }
    prod.qtd += 1;
    setCart([...cart]);
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

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) return <div>Loading</div>;
  return (
    <div className='relative'>
      <header className='header-container flex justify-between items-top p-1'>
        <h1 className='title text-3xl'>Menu</h1>
        <div className='cart-container relative'>
          {cart.length > 0 && (
            <p className='counter px-1 absolute bb rounded-full bg-red-900 border-none right-[-10px] top-[-10px]'>
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
      <ul className='items-container flex flex-col gap-2'>
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
                <div className='total-price '>
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
                  className='bg-green-700 px-4 py-2 flex mx-auto items-center gap-3'
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
    </div>
  );
};

export default Table;
