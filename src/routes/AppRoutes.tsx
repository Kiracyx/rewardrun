import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Rewards from "../pages/Rewards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rewards" element={<Rewards />} />
    </Routes>
  );
}
