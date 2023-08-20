/* eslint-disable react/prop-types */
import moment from 'moment/moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TableCard = (props) => {
  const [index, setIndex] = useState(0);
  console.log(props.commands[index], 'log');

  const handleNext = () => {
    const next = (index + 1) % props.commands.length;
    setIndex(next);
  };
  const handlePrev = () => {
    const prev = (index - 1) % props.commands.length;
    setIndex(prev);
  };

  const calcTotal = (arr) => {
    const subTotal = arr.map((cmm) => {
      return cmm.command.reduce((a, b) => (a += b.price * b.qtd), 0);
    });
    return subTotal.reduce((a, b) => (a += b), 0);
  };
  return (
    <div className='table-container www flex flex-col justify-between p-1 gap-2'>
      <div className='flex gap-1 bb justify-around my-1'>
        <h2>Mesa: {props.name}</h2>
        <h2>Total: {calcTotal(props.commands).toFixed(2)} R$</h2>
      </div>
      {props.commands && props?.commands[index] && (
        <div className='pagination-container flex'>
          <button
            disabled={index - 1 < 0}
            onClick={() => handlePrev()}
            type='button'
            className='www mx-auto py-1 disabled:opacity-30'
          >
            prev
          </button>
          <button
            disabled={index + 1 >= props.commands.length}
            onClick={() => handleNext()}
            type='button'
            className='www mx-auto py-1 disabled:opacity-30'
          >
            next
          </button>
        </div>
      )}
      <ul className='commands-container-table flex flex-col gap-2'>
        {props.commands && props?.commands[index] && (
          <li className='comand-container-table bg-zinc-600 border border-zinc-300'>
            <>
              <p>Numero da ordem: {props.commands.length - index}</p>
              {props?.commands[index]?.command.map((item, i) => (
                <div
                  className={`flex gap-1 p-1 justify-between ${
                    i % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-700'
                  }`}
                  key={i + item.id}
                >
                  <p className='flex-1 text-start'>Item: {item.name}</p>
                  <p className='flex-1 text-center'>Quantidade: {item.qtd}</p>
                  <p className='flex-1 text-end'>Preço: {item.price}</p>
                </div>
              ))}
              {props.commands[index] && (
                <small>
                  {moment(props.commands[index]?.date).format(
                    'DD/MM/YYYY, HH:mm:ss'
                  )}
                </small>
              )}
            </>
          </li>
        )}
      </ul>
      {props?.commands?.length > 0 && (
        <button
          type='button'
          onClick={() => props.clearTable(props.hash)}
          className='www mx-auto py-1'
        >
          Clear
        </button>
      )}
      <div className='flex justify-between px-2 py-1 items-center'>
        <small>{props.hash}</small>
        <Link
          to={`${window.location.href}${props.route}/${props.hash}`}
          target='_blank'
        >
          Link
        </Link>
      </div>
    </div>
  );
};

export default TableCard;
