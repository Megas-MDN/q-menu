import { useEffect, useRef, useState } from 'react';
import socket from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = ({ route, table }) => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket(SOCKET_URL, {
      query: { restaurant: route },
    });

    socketRef.current.on('recive-command', (socketData) => {
      setData((prev) => [socketData, ...prev]); // restaurant
    });

    socketRef.current.on('go-get', (socketData) => {
      if (socketData.table === table) {
        setInfo((prev) => [socketData, ...prev]); // customer
      }
    });

    return () => socketRef.current.disconnect();
  }, [route, table]);

  const sendCommand = (body) => {
    // customer
    socketRef.current.emit('send-command', body);
  };

  const sendReadyToGet = (body) => {
    // restaurant
    socketRef.current.emit('ready-to-get', body);
  };

  return { sendCommand, sendReadyToGet, data, info };
};

export default useSocket;
