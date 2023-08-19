/* eslint-disable react/prop-types */
import moment from 'moment/moment';
import { useState } from 'react';

const TableCard = (props) => {
  const [index, setIndex] = useState(0);
  console.log(props.commands[index], 'log');

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
      <ul className='commands-container-table flex flex-col gap-2'>
        {props.commands.map((el, indx) => (
          <li
            key={indx}
            className='comand-container-table bg-zinc-600 border border-zinc-300'
          >
            <>
              {el.command.map((item, i) => (
                <div
                  className={`flex gap-1 p-1 justify-between ${
                    i % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-700'
                  }`}
                  key={i + item.id}
                >
                  <p>Item: {item.name}</p>
                  <p>Quantidade: {item.qtd}</p>
                  <p>Preço: {item.price}</p>
                </div>
              ))}
              <small>{moment(el.date).format('DD/MM/YYYY, HH:mm:ss')}</small>
            </>
          </li>
        ))}
      </ul>
      {props.commands.length > 0 && (
        <button
          type='button'
          onClick={() => props.clearTable(props.hash)}
          className='www w-fit mx-auto py-1'
        >
          Clear
        </button>
      )}
      <small>{props.hash}</small>
    </div>
  );
};

export default TableCard;
