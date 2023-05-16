// import React, { createContext, useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';

// interface SocketProviderProps {
//   children: React.ReactNode;
// }

// interface SocketContextProps {
//   socket: Socket | null;
// }

// // Create the Socket.IO context
// export const SocketContext = createContext<SocketContextProps>({
//   socket: null,
// });

// // Create the Socket.IO provider component
// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:8080');

//     // Store the Socket.IO client instance in the state variable
//     setSocket(newSocket);

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
//   );
// };



import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {socket && children}
    </SocketContext.Provider>
  );
};
