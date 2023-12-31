/* eslint-disable react/prop-types */
import moment from 'moment/moment';
import { useCommand } from '../store/useCommand';
import { AiFillCloseSquare } from 'react-icons/ai';

const ModalCommand = (props) => {
  const store = useCommand();
  return (
    <div className='commands-container fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-1'>
      <div className='modal-command bg-zinc-500 bg-opacity-30 py-2 w-[350px] flex flex-col justify-center gap-3'>
        <header className='modal-command-header flex justify-between px-2'>
          <h1 className='title text-2xl'>Comandas</h1>
          <button
            className='btn-close transition ease-in delay-100 duration-300  hover:text-neutral-800 hover:bg-white p-0'
            type='button'
            onClick={() => props.setOpenCommand(false)}
          >
            <AiFillCloseSquare size={'1.8rem'} />
          </button>
        </header>
        <ul className='commands-container max-h-[535px] overflow-y-scroll'>
          {store.commands.map((cmm, i) => (
            <li key={i + `${cmm.date}`} className=' bg-zinc-600 bg-opacity-40'>
              <hr className='w-full border boder-white' />
              <h2 className='mb-2'>
                Data-hora da comanda:{' '}
                <span className='date text-sm'>
                  {moment(cmm.date).format('DD/MM/YYYY, HH:mm:ss')}
                </span>
              </h2>
              <h3 className='text-left px-2 font-semibold  bg-zinc-600 bg-opacity-40'>
                Nº da ordem: {store.commands.length - i}
              </h3>
              <ul className='command-container'>
                <li
                  key={0}
                  className='items-container flex justify-between bg-zinc-700 px-2'
                >
                  <h3 className=' font-semibold'>Nome</h3>
                  <p className=' font-semibold'>Quantidade</p>
                  <p className=' font-semibold'>Valor</p>
                </li>
                {cmm.command.map((item, j) => (
                  <li
                    key={item.id + j}
                    className='items-container flex justify-between px-2'
                  >
                    <h3 className='flex justify-start w-1/3'>{item.name}</h3>
                    <p className=' w-1/3'>{item.qtd}</p>
                    <p className='flex justify-end w-1/3'>{item.price}</p>
                  </li>
                ))}
                <div className='my-1 flex justify-between px-2 bg-zinc-500 bg-opacity-30'>
                  Total:{' '}
                  <span className=' font-semibold'>
                    {cmm.total.toFixed(2)} R$
                  </span>
                </div>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <button
        type='button'
        className='border border-zinc-400 my-2 px-2 py-1'
        onClick={() => {
          store.resetAll();
          props.setOpenCommand(false);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default ModalCommand;
