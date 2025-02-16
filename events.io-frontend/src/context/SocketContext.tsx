import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { socket } from '@/services/socket.service';
// import { IMessage } from '@/@types/shared/chat';
import { TConnectionRequest } from '@/@types/shared/connection-request';

// import { MessageContext } from './messageContext';

interface ProviderProps {
  children: ReactNode;
}
type SocketContextProps = {
  socketConnected: boolean;
  openChatWidget: boolean;
  connectionRequests: TConnectionRequest[];
  setOpenChatWidget: (value: boolean) => void;
  setConnectionRequests: (requests: TConnectionRequest[]) => void;
  networkConnected: boolean;
};

const Context = createContext<SocketContextProps>({
  socketConnected: false,
  openChatWidget: false,
  setOpenChatWidget: (value: boolean) => value,
  connectionRequests: [],
  setConnectionRequests: () => {},
  networkConnected: true,
});

const SocketProvider = ({ children }: ProviderProps) => {
  const [connected, setConnected] = useState(false);
  const [openChatWidget, setOpenChatWidget] = useState(false);
  const [networkConnected, setNetworkConnected] = useState(true);
  const [connectionRequests, setConnectionRequests] = useState<
    TConnectionRequest[]
  >([]);

  useEffect(() => {
    window.addEventListener('offline', function () {
      setNetworkConnected(false);
    });
    window.addEventListener('online', function () {
      setNetworkConnected(true);
    });
  }, []);

  const onNewConnectionRequest = () => {
    socket.on('connections:new', (data) => {
      setOpenChatWidget(true);
      const messageData = JSON.parse(data);
      setConnectionRequests((previousValue) => [messageData, ...previousValue]);
    });
  };

  const onConnectionAccepted = () => {
    socket.on('connections:accept', (data) => {
      setOpenChatWidget(true);
      const messageData = JSON.parse(data);
      const connectionIndex = connectionRequests.findIndex(
        (item) => item._id === messageData._id
      );
      const newArray = [...connectionRequests];
      if (connectionIndex !== -1) {
        newArray[connectionIndex].status = 'accepted';
        setConnectionRequests(newArray);
      }
    });
  };
  const onConnectionDeclined = () => {
    socket.on('connections:decline', (data) => {
      setOpenChatWidget(true);
      const messageData = JSON.parse(data);
      const connectionIndex = connectionRequests.findIndex(
        (item) => item._id === messageData._id
      );
      const newArray = [...connectionRequests];
      if (connectionIndex !== -1) {
        newArray[connectionIndex].status = 'declined';
        setConnectionRequests(newArray);
      }
    });
  };

  useEffect(() => {
    onConnectionAccepted();
    onConnectionDeclined();
    onNewConnectionRequest();

    return () => {
      socket.removeListener('connections:new');
      socket.removeListener('connections:accept');
      socket.removeListener('connections:decline');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ socketConnected: connected });

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
      const successLog = [
        'background: #22c55d',
        'color: white',
        'display: block',
        'text-align: center',
      ].join(';');
      console.info('%c Connected to sockets', successLog);
    });
    socket.on('disconnect', () => {
      setConnected(false);
      const successLog = [
        'background: #ef4444',
        'color: white',
        'display: block',
        'text-align: center',
      ].join(';');
      console.info('%c Disconnected from sockets', successLog);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const state: SocketContextProps = {
    socketConnected: connected,
    openChatWidget,
    setOpenChatWidget,
    connectionRequests,
    setConnectionRequests,
    networkConnected,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const useSocketContext = () => useContext(Context);

export { SocketProvider, useSocketContext };
