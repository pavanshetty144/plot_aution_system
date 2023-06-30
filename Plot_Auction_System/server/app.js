require('dotenv').config()
const express = require('express')
const app = express()

const db = require('./config/database');
const PORT =process.env.PORT
const userRouter=require('./route/userRoute')
const plotAuctionRoute=require('./route/plotAuctionRoute')
const realTimeNotification=require('./route/realTimeNotification')
const cors =require('cors')
const http = require('http');
const Socketio = require('socket.io');


app.use(cors());
  

const server = http.createServer(app);

const io = Socketio(server);
// Access the Engine.IO server
const engine = io.engine;
if (engine) {
    console.log('Socket.IO is running');
  } else {
    console.log('Socket.IO is not running');
  }
db.connect()


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));



app.use(userRouter)
app.use(plotAuctionRoute)
app.use(realTimeNotification)




server.listen(PORT,()=>{
    console.log(`Server started in ${PORT}`);
    })

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
  
    // // Join a room
    socket.on('joinRoom', async(roomId,plotId,bidAmount,userName) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`,plotId,userName,bidAmount);

    let collection= await db.getCollection("rooms_users")

      const roomData = await collection.findOne({ room_id: roomId });
   
      if (roomData) {
        // Room exists, add user to the room's users array
        
        const newUser = { username: userName, bid_price:bidAmount };
  
        // Check if the user already exists in the room
        const userExists = roomData.users.some((user) => user.username === newUser.username);
        if (!userExists) {
          roomData.users.push(newUser);
          await collection.updateOne({ room_id: roomId }, { $set: { users: roomData.users } });
        }

         // Broadcast the outbid notification to other users in the same room
          socket.to(roomId).emit('bidNotificaation', { userName, bidAmount, roomId });

      } else {
        // Room doesn't exist, create a new room entry
        const newRoom = {
          room_id: roomId,
          plot_id: plotId,
          users: [
            {
              username: userName,
              bid_price: bidAmount,
            },
          ],
        };
        await collection.insertOne(newRoom);
      }



      console.log(socket.rooms,   "People:",Array.from(socket.adapter.rooms.get(roomId)));
    });
   
   

    socket.emit('notification', "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); 
 
 
    
    // Disconnect handling
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });


  module.exports=io