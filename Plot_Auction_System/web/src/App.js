import React from 'react';
import {  Routes, Route, Navigate,Outlet  } from 'react-router-dom';
import Home from './pages/home/Home';
import Plots from './pages/plots/plots'; 
import Login from './pages/login/Login';
import Registration from './pages/register/Registration';
import './App.css';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import Navbar from './components/navbar/navbar';


function App() {


  const isAuthenticated = useSelector((state)=>{
 
    return state?.auth?.isAuthenticated

  }) // Set this based on your authentication logic

  return (
    <>
{  isAuthenticated &&  <Navbar/>}
    <Routes>
     
     <Route path="/login" element={<Login/>} />
     <Route path="/register" element={<Registration/>} />
    
<Route element={<PrivateRoutes isAuthenticated={isAuthenticated}/> }>

<Route exact path="/" element={<Plots/>} />
<Route path="/plots" element={<Plots/>} />

</Route>
    
   </Routes>
    </>
 
  );
};

const PrivateRoutes = ({  isAuthenticated }) => {
  return   isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};



export default App;
