import io from 'socket.io-client';
import React from 'react';
// const socket = io(process.env.REACT_APP_BASEURL);

export const socket = io(process.env.REACT_APP_BASEURL, {
  transports: ['websocket','polling'],
  cors: {
    // origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ['GET', 'POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});


export const SocketContext = React.createContext();

// React. useEffect(() => {
//     console.log(socket);
//       // Socket.IO connection event
//       socket.on('connect', () => {
//         console.log('Connected to Socket.IO server');
//       });
  
//     socket.emit('nott',"@@@@@@@@@@@##########$$$$$$$$")
//        // Listen for incoming real-time notifications
//        socket.on('nanu', (message) => {
//         console.log('Received notification:', message);
//       });
//       // Socket.IO disconnection event
//       socket.on('disconnect', () => {
//         console.log('Disconnected from Socket.IO server');
//       });
  
//       // Clean up the socket connection
//       // return () => {
//       //   socket.disconnect();
//       // };
//     }, []);