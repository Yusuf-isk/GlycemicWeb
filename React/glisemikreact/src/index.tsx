import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css';
const router = <Router>
  <Routes>
    <Route path='/' element={<Home/>} />
  </Routes>
</Router>


ReactDOM.render(
  router,
  document.getElementById('root')
);


reportWebVitals();
