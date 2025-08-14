import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import HeroCarousel from "./pages/Home";
import Gallery from "./pages/Gallery";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div style={{ padding: "20px" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroCarousel />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* 404 səhifəsi */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
