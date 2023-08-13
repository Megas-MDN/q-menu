/* eslint-disable react/prop-types */
import { CiSquareRemove } from 'react-icons/ci';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';

const CartItem = (props) => {
  return (
    <div className='flex justify-between w-[250px] mx-auto bg-zinc-800 px-2 py-1 rounded-lg bg-opacity-50'>
      <img src={props.pic} alt={props.name} className='w-[80px] rounded-full' />
      <div className='grid grid-cols-2 gap-1 items-center w-[150px]'>
        <h4>{props.name}</h4>
        <div className='btn-trash-container flex justify-end w-full'>
          <button
            onClick={() => props.removeItem(props.id)}
            type='button'
            className='flex justify-end p-1 items-center w-fit focus:outline-none'
          >
            <CiSquareRemove size={'1.5rem'} />
          </button>
        </div>
        <div className='qtd-container flex w-full justify-between border border-zinc-700 h-[25px]'>
          <button
            onClick={() => props.subtractCart(props.id)}
            type='button'
            className='p-0 bg-zinc-400 rounded-none'
          >
            <RiSubtractFill color='black' />
          </button>
          <div className='w-[28px] bg-zinc-600 flex-grow bg-opacity-50 flex justify-center items-center'>
            {props.qtd}
          </div>
          <button
            onClick={() => props.plusCart(props.id)}
            type='button'
            className='p-0 bg-zinc-400 rounded-none'
          >
            <IoMdAdd color='black' />
          </button>
        </div>
        <p className='price font-semibold items-center flex justify-end'>
          {(props?.price * props.qtd).toFixed(2)}{' '}
          <span className='cifra text-[12px] h-[20px] w-[20px] flex justify-center items-start'>
            R$
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
