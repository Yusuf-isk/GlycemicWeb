import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home'
import NewFood from './pages/NewFood'
import About from './pages/About'
import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/TopBar/TopBar';
import FoodDetail from './pages/FoodDetail';
import FoodsAdd from './pages/FoodsAdd';
import Footer from './footer/Footer';

const router = <Router>
  <TopBar></TopBar>
  <Routes>
  
    <Route path='/' element={<Home/>} />
    <Route path='/newfood' element={<NewFood/>} />
    <Route path='/about' element={<About/>} />
    <Route
          path="detail/:url"
          element={<FoodDetail />}
        />
  </Routes>
  <div style={{marginBottom:20}}></div>
  <Footer></Footer>
</Router>


ReactDOM.render(
  router,
  document.getElementById('root')
);


reportWebVitals();
