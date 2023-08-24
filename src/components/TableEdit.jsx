/* eslint-disable react/prop-types */
import QRCode from 'react-qr-code';
import { BiTrashAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const TableEdit = (props) => {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className='table-card border border-zinc-500 rounded-md w-[300px] h-[230px] p-2 flex flex-col justify-between gap-2'>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>Nome: {props.name}</h1>
        <button
          type='button'
          className='www px-2 py-1'
          onClick={() =>
            props.removeTable({ index: props.index, hash: props.hash })
          }
        >
          <BiTrashAlt size={'1rem'} />
        </button>
      </div>

      <QRCode
        onClick={() => navigate(`/qr-code-table/${props.route}/${props.hash}`)}
        value={`${window.location.origin}/${props.route}/${props.hash}`}
        className='qrcode-container bg-white p-2 w-full'
      />

      <Link
        to={`${window.location.origin}/${props.route}/${props.hash}`}
        target='_blank'
      >
        <small>{props.hash}</small>
      </Link>
    </div>
  );
};

export default TableEdit;
