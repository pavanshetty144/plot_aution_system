import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ListItem } from '@mui/material';
import BasicModal from '../plotdetailsmodal/plotdetailsmodal';

export default function PlotCards({plotName,city,size,image,startPrice,endDate}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
    <Card >
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plotName}
        </Typography>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <ListItem>City: {city}</ListItem>
        <ListItem>Size: {size}</ListItem>
        {/* <ListItem>end date:{"2022/23/03"}</ListItem> */}
      </Box>
        <Typography variant="body2" color="text.secondary">
          
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cum sociis natoque penatibus et magnis dis parturient montes
        </Typography>
      </CardContent>
      <CardActions  sx={{ display:"flex",justifyContent: 'center' }}>
      
        <Button size="medium" variant="outlined" onClick={handleOpen}>View / Bid</Button>
      </CardActions>
    </Card>
   

    <BasicModal setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} open={open} plotName={plotName} city={city} size={size} image={image} startPrice={startPrice} endDate={endDate}/>
    </>
  );
}
