import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import BridgeHealthDashboard from "./pages/use-axis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/project" element={<Project />} />
      <Route path="/useAxis" element={<BridgeHealthDashboard />} />
    </Routes>
  );
}

export default App;