import React from 'react';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';



function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <>
    <BrowserRouter>
    <Container maxidth="lg">
    <Navbar/>
    <Routes>
      <Route path='/' exact element={<Navigate to="/posts" />}/>
      <Route path='/posts' exact element={<Home/>}/>
      <Route path='/posts/search' exact element={<Home/>}/>
      <Route path='/posts/:id' element={<PostDetails/>}/>
      <Route path='/auth' element={!user?<Auth/>:<Home/>}/>
    </Routes>
    </Container>
    </BrowserRouter>
    

    </>
  );
}

export default App;