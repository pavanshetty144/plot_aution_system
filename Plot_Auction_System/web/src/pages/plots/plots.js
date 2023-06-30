import { useEffect,useContext } from "react"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { fetchPlots } from "../../store/feature/plotsSlice"
import PlotCards from "../../components/plotcards.js/plotcards"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import { SocketContext } from "../../context/socketContext/socketcontext"


function Plots() {
    const socket = useContext(SocketContext);

    let plotsList=useSelector((state)=>{
        return state.plots.plots
    })




    let dispatch=useDispatch()

    useEffect(()=>{
        
       dispatch(fetchPlots())
    },[])

    



    return <>
    <Grid marginTop={2} container   sx={{width:"100%", margin:"" ,padding:"0"}} justifySelf={"center"}>
    {plotsList.length && plotsList.map((item)=>{
       
return  (   <Grid item xs={12} sm={6} md={4} lg={3} sx={{padding:"10px", display:"flex",justifyContent:"center"}} >
    <PlotCards  plotName={item.plot_id} city={item.location} size={item.size} image={item.image} startPrice={item.starting_bid} endDate={item.end_time}/>

    </Grid>)

    }) }
      </Grid>
    </>
}

export default Plots