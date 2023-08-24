/* eslint-disable react/prop-types */
import { v4 } from 'uuid';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import fetchService from '../service/fetchService';

const NewTable = ({ setOpen, token, addTable }) => {
  const [name, setName] = useState('');
  const hash = useRef(v4());

  const handleSave = async () => {
    if (!name || !hash) return;
    const res = await fetchService.postApi({
      url: '/new-table',
      auth: token,
      data: { name, hash: hash.current },
    });
    console.log(res, 'res');
    if (!res?.result) return;
    addTable({ name, hash: hash.current, commands: [] });
    setOpen(false);
  };

  return (
    <div className='commands-container fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex flex-col justify-center items-center p-1'>
      <div className='modal-command bg-zinc-500 bg-opacity-30 py-2 w-[350px] flex flex-col justify-center gap-1 max-h-[390px] overflow-y-scroll'>
        <div className='btn-contanier flex justify-between p-2'>
          <label htmlFor='name' className='flex gap-2 items-center'>
            <p>Name</p>
          </label>
          <input
            autoComplete='off'
            id='name'
            type='text'
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            className='px-2 py-1 outline-none w-[200px]'
            placeholder='Nome da mesa'
          />

          <button
            type='button'
            className='www px-2 py-1'
            onClick={() => setOpen(false)}
          >
            <AiFillCloseSquare size={'1.5rem'} />
          </button>
        </div>
        <div className='container p-2 flex flex-col gap-1'>
          <QRCode
            value={`${window.location.origin}/${'props.route'}/${'props.hash'}`}
            className='qrcode-container bg-white p-2 mx-auto w-[200px] h-[200px]'
          />
          <small className='bg-zinc-800'>{hash.current}</small>
          <button
            onClick={handleSave}
            type='button'
            className='www bg-zinc-400 bg-opacity-30'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTable;
