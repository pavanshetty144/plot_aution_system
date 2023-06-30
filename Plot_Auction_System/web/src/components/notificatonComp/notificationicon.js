import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SocketContext } from '../../context/socketContext/socketcontext';

import Box from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';
import NotificationSound from "./Custom Notification Sound Galaxy S9 (1).mp3";

function notificationsLabel(count) {

  



  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges() {

    let socket = React.useContext(SocketContext)
    const audioPlayer = React.useRef(null);

    function playAudio() {
        audioPlayer.current.play();
      }

    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
      });
      const [message,setMessage]=React.useState('')
      const { vertical, horizontal, open } = state;
    
      const displayNotification = () =>  {
       
        setState((preState)=>{
      return{...preState,open:true}
        });
        setTimeout(()=>{
            setState((preState)=>{
                return{...preState,open:false}
                  });
        },4000)
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

React.useEffect(()=>{
console.log(state);
},[state])


    React.useEffect(()=>{
       socket.on('bidNotificaation',({userName,bidAmount,roomId})=>{
        console.log(userName,bidAmount,roomId ,"notification received *&*&*&*&*&*&&*&*&*&*&&*&*&&&&*");
        setMessage(`${userName}  made a bid on ${roomId} ,amount ${bidAmount}`)
        playAudio()
       })
    },[])

  return (
    <>
 <IconButton  onClick={  displayNotification }  >
      <Badge badgeContent={message.length ? 1: 0}  color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    

    <Box sx={{ width: 500 }}>
    
      <Snackbar
        anchorOrigin={{ vertical , horizontal }}
        open={open}
        // onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
    <audio ref={audioPlayer} src={NotificationSound} />

    </>
   



  );
}
