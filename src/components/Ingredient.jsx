/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const Ingredient = (props) => {
  const [item, setItem] = useState(props.pKey);

  const handleChange = (value) => {
    setItem(value);
  };

  const handleOnblur = () => {
    if (item === props.pKey) return;
    console.log(item, 'handleOnblur');
    props.editItem({ index: props.index, value: item });
  };

  return (
    <li className='infredient-list flex p-1 justify-between'>
      <input
        className='px-2 py-1'
        type='text'
        disabled={!props.editMode}
        value={item}
        onChange={({ target: { value } }) => handleChange(value)}
        onBlur={handleOnblur}
      />
      {props.editMode && (
        <button
          type='button'
          className=' p-0'
          onClick={() => props.removeIngredit(props.pKey)}
        >
          <AiOutlineCloseSquare size={'1.5rem'} />
        </button>
      )}
    </li>
  );
};

export default Ingredient;
