import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid,Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { SocketContext } from "../../context/socketContext/socketcontext"
import { useSelector } from 'react-redux';

import swal from 'sweetalert';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open,setOpen,handleClose,handleOpen,image,plotName,city,size,startPrice,endDate}) {
  const socket = React.useContext(SocketContext);
  
  const userName =useSelector((state)=>{
 
    return state?.auth?.user

  })
  
  const [bidAmount, setBidAmount] = React.useState('');
  const [error, setError] = React.useState('');



  const handleBidAmountChange = (event) => {
    const enteredAmount = event.target.value;
    setBidAmount(enteredAmount);

    if (enteredAmount > startPrice) {
      setError('');
    } else {
      setError('Bid amount should be greater than start price');
     
    }
  };

  const placeTheBid = (roomId,plotId,bidAmount,userName)=>{
    console.log(roomId,plotId,bidAmount,userName);
    socket.emit("joinRoom",roomId,plotId,bidAmount,userName)
    
    handleClose()
    swal("Successful! Bid", "Payment Done", "success");
  }


    return (
      <div>
      
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {plotName}
            </Typography>
            <Grid container justifyContent="space-between">
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <img
          src={image}
          alt="Image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
      <Grid  item xs={12} sm={6} md={6} lg={6}>
      <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Plots Details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}  container alignItems={'center'}>
          <Typography variant="subtitle1">City :</Typography>
          <Typography variant="body1"> {city}</Typography>
        </Grid>
        <Grid item xs={6}  container alignItems={'center'}>
        <Typography variant="subtitle1">Size : </Typography>
          <Typography variant="body1"> {size}</Typography>
        </Grid>
        <Grid item xs={6}  container alignItems={'center'}>
        <Typography variant="subtitle1">Start Price : </Typography>
          <Typography variant="body1"> {startPrice}</Typography>
        </Grid>
         <Grid item xs={6}  container alignItems={'center'}>
        <Typography variant="subtitle1">End Date: </Typography>
          <Typography variant="body1"> {endDate}</Typography>
        </Grid>
        
       
       
      </Grid>
      <Grid    container alignItems={'center'} padding={2} justifyContent={'space-between'}>
        <Typography variant="subtitle1">Enter Amount </Typography>
        <TextField  value={bidAmount}  onChange={handleBidAmountChange} error={Boolean(error)} helperText={error}/>
        </Grid>
        <Grid    container alignItems={'center'} padding={2} justifyContent={'center'}>
        <Button  size="medium" variant="outlined" sx={{fontWeight:"bold"}} disabled={bidAmount > startPrice ?false:true } onClick={()=>{
            placeTheBid(plotName,plotName,bidAmount,userName)
        }}>Place Bid</Button>
        </Grid>
    </Container>
    

      </Grid>
    </Grid>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Modal>
      </div>
    );
  }
  