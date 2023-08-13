/* eslint-disable react/prop-types */
import { useState } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
const Item = (props) => {
  const [open, setOpen] = useState(false);
  const ingredients = Object.keys(props?.ingredients || {});
  const isIngrediens = ingredients.length > 0;
  return (
    <li className='item-container w-[300px] p-1 border border-zinc-500'>
      <div className=' flex p-1 justify-between gap-1'>
        <img
          className=' rounded-full w-[120px]'
          src={props.pic}
          alt={props.name}
        />
        <button
          type='button'
          onClick={() =>
            props.addCart({
              id: props.id,
              pic: props.pic,
              name: props.name,
              price: props.price,
            })
          }
          className='add-cart flex items-center p-0 h-fit self-center rounded-full w-[40px]'
        >
          <MdOutlineAddShoppingCart
            size={'2.5rem'}
            style={{
              borderRadius: '100%',
              background: 'green',
              padding: '5px',
            }}
          />
        </button>
        <div className='title-price-container flex flex-col justify-between items-end w-[75px]'>
          <h2 className='title text-2xl'>{props.name}</h2>
          <p className='price text-lg font-semibold flex items-center'>
            {props?.price.toFixed(2)}{' '}
            <span className='cifra text-[12px] h-[20px] w-[20px] flex justify-center items-end'>
              R$
            </span>
          </p>
        </div>
      </div>
      {isIngrediens && (
        <div className=' bg-zinc-400 rounded bg-opacity-10'>
          {open && (
            <ul className='ingredients-container p-1 grid grid-cols-2'>
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          )}
          <button
            type='button'
            className='w-full flex justify-center'
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <SlArrowUp /> : <SlArrowDown />}
          </button>
        </div>
      )}
    </li>
  );
};

export default Item;
