/* eslint-disable react/prop-types */
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiFillEdit,
  AiFillSave,
} from 'react-icons/ai';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { BiTrashAlt } from 'react-icons/bi';
import { useState } from 'react';
import Ingredient from './Ingredient';

const PLACEHOLDER_IMG =
  'https://letshummussaintjohn.com/img/placeholders/burger_placeholder.png?v=1';

const Menu = (props) => {
  const [item, setItem] = useState({
    id: props.id,
    name: props.name || '',
    pic: props.pic || '',
    price: props.price || '',
    editMode: props.editMode || false,
  });

  const [ingredients, setIngredients] = useState({
    ...props.ingredients,
  });

  const [open, setOpen] = useState(props.editMode);
  const [openPlus, setOpenPlus] = useState(false);

  const [ingredient, setIngredient] = useState('');

  const [erroMessage, setErroMessage] = useState('');

  const addIngredit = () => {
    if (!ingredient) return;
    setIngredients((prev) => ({ ...prev, [ingredient]: true }));
    setOpenPlus(false);
    setIngredient('');
  };

  const removeIngredit = (item) => {
    // key: true
    setIngredients((prev) =>
      Object.keys(prev).reduce((a, b) => {
        if (b === item) return a;
        a[b] = true;
        return a;
      }, {})
    );
  };

  const handleSave = () => {
    setItem((prev) => ({ ...prev, editMode: false }));
    setOpen(false);
    const { message } = props.save({
      ...item,
      ingredients: {
        ...ingredients,
      },
      editMode: false,
    });

    setErroMessage(message || '');
  };

  const editItem = ({ value, index }) => {
    setIngredients((prev) =>
      Object.keys(prev).reduce((a, b, i) => {
        if (i !== index) return { ...a, [b]: true };
        a[value] = true;
        return a;
      }, {})
    );
  };

  const handleTrash = () => {
    props.deleteItem(props.id);
  };

  return (
    <li className='border border-zinc-300 p-2 w-[350px] flex flex-col gap-1 items-center mx-auto max-h-[500px] overflow-y-scroll'>
      {erroMessage && <h1 className='text-xl'>{erroMessage}</h1>}
      <div className='save-edit-container w-full flex flex-row-reverse justify-between'>
        {item.editMode ? (
          <>
            <button type='button' onClick={() => handleSave()}>
              <AiFillSave size={'2rem'} />
            </button>
            <button type='button' onClick={() => handleTrash()}>
              <BiTrashAlt size={'1rem'} />
            </button>
          </>
        ) : (
          <button
            type='button'
            className=' '
            onClick={() => {
              setItem((prev) => ({ ...prev, editMode: true }));
              setOpen(true);
            }}
          >
            <AiFillEdit size={'2rem'} />
          </button>
        )}
      </div>
      <label
        htmlFor='name'
        className='flex gap-2 w-full justify-between p-1 items-center'
      >
        Nome
        <input
          type='text'
          id='name'
          value={item.name}
          onChange={({ target: { value } }) =>
            setItem((prev) => ({ ...prev, name: value }))
          }
          disabled={!item.editMode}
          className='bg-zinc-700 px-2 py-1 disabled:opacity-80 '
        />
      </label>
      <label
        htmlFor='price'
        className='flex gap-2 w-full justify-between p-1 items-center'
      >
        Preço
        <input
          type='text'
          id='price'
          value={item.price}
          onChange={({ target: { value } }) =>
            setItem((prev) => ({ ...prev, price: value }))
          }
          disabled={!item.editMode}
          className='bg-zinc-700 px-2 py-1 disabled:opacity-80'
        />
      </label>
      <label
        htmlFor='price'
        className='flex gap-2 w-full justify-between p-1 items-center'
      >
        Imagem
        <input
          type='text'
          id='price'
          value={item.pic}
          onChange={({ target: { value } }) =>
            setItem((prev) => ({ ...prev, pic: value }))
          }
          disabled={!item.editMode}
          className='bg-zinc-700 px-2 py-1 disabled:opacity-80'
        />
      </label>
      <img
        src={item.pic || PLACEHOLDER_IMG}
        alt={item.name || 'Imagem do lanche'}
        className=' rounded-full w-[150px] bg-zinc-800'
      />

      <div className='ingredients-top-down-container w-full flex flex-col'>
        {open && (
          <>
            <div className='title-ingredient-container flex w-full justify-between p-1 items-center'>
              <h4>Ingredientes</h4>
              {!openPlus && item.editMode && (
                <button
                  type='button'
                  onClick={() => setOpenPlus(true)}
                  className=' rounded-full bg-zinc-500 w-[30px] h-[30px] flex justify-center p-0 items-center'
                >
                  <AiOutlinePlus />
                </button>
              )}
            </div>
            <hr className='line w-full my-2 border border-zinc-400' />
            {openPlus && (
              <div className='new-ingrediet-container flex justify-between items-center p-1'>
                <label
                  htmlFor='ingrediente'
                  className='flex gap-2 items-center'
                >
                  Ingrediente
                  <input
                    onChange={({ target: { value } }) => setIngredient(value)}
                    value={ingredient}
                    type='text'
                    id='ingrediente'
                    className='px-2 py-1'
                  />
                </label>
                <button
                  type='button'
                  className=' p-1'
                  onClick={() => addIngredit()}
                >
                  <AiOutlineCheck />
                </button>
              </div>
            )}
            <ul className='ingredient-list-container flex flex-col'>
              {Object.keys(ingredients).map((key, i) => (
                <Ingredient
                  key={key + i}
                  index={i}
                  pKey={key}
                  removeIngredit={removeIngredit}
                  editMode={item.editMode}
                  editItem={editItem}
                />
              ))}
            </ul>
          </>
        )}
        <button
          type='button'
          className='www flex justify-center mt-1'
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      </div>
    </li>
  );
};

export default Menu;
