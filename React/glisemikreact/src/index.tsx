import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/TopBar/TopBar';

const router = <Router>
  <TopBar></TopBar>
  <Routes>
  
    <Route path='/' element={<Home/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/about' element={<About/>} />
  </Routes>
</Router>


ReactDOM.render(
  router,
  document.getElementById('root')
);


reportWebVitals();
