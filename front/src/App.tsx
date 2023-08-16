import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Questionnaire from "./pages/questionnaire";
import Share from "./pages/share";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/share" element={<Share />} />
    </Routes>
  );
}

export default App;
