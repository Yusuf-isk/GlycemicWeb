import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home";
import NewFood from "./pages/NewFood";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./components/TopBar/TopBar";
import FoodDetail from "./pages/FoodDetail";
import Footer from "./pages/footer/Footer";
import UserFoodList from "./pages/UserFoodList";
import AdminPage from "./pages/AdminPage";
const router = (
  <Router>
    <TopBar></TopBar>
    <div style={{ minHeight: 1200 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newfood" element={<NewFood />} />
        <Route path="/myfood" element={<UserFoodList />} />
        <Route path="/adminpage" element={<AdminPage />} />

        <Route path="detail/:url" element={<FoodDetail />} />
      </Routes>
    </div>
    <div style={{ marginBottom: 400 }}></div>

    <Footer></Footer>
  </Router>
);

ReactDOM.render(router, document.getElementById("root"));

reportWebVitals();
