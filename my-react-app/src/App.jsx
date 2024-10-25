import React from "react";
import Payy from "./Payy.jsx";
import Success from "./Success.jsx";
import { Router, Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Router> */}
      <Routes>
        <Route path="/pay" element={<Payy />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      {/* </Router> */}
    </BrowserRouter>
  );
};

export default App;
