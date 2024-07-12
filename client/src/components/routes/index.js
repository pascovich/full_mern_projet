import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Home from "../../pages/homePage";
import Profil from "../../pages/profilPage";
import Trending from "../../pages/trendingPage";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/treding" element={<Trending />} />
          {/* <Navigate  to="/" /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default index;
