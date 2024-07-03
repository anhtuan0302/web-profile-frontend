import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AdminRoutes from "./routes/admin";
import IndexRoutes from "./routes/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<IndexRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;


