import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const QrCodeTable = () => {
  const { restaurant, table } = useParams();
  const navigate = useNavigate();
  console.log(restaurant, table);
  return (
    <div>
      <div className='btn-container flex p-2 justify-around'>
        <button className='www' onClick={() => navigate('/')}>
          Home
        </button>
        <button className='www' onClick={() => navigate('/table')}>
          Mesas
        </button>
      </div>
      <QRCode
        onClick={() => navigate(`/table`)}
        value={`${window.location.origin}/${restaurant}/${table}`}
        className='qrcode-container bg-white p-3 w-full h-[450px]'
      />
    </div>
  );
};

export default QrCodeTable;
