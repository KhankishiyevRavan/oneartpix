import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import HeroCarousel from "./pages/Home";
import Gallery from "./pages/Gallery";
import Footer from "./layout/Footer";
import GalleryDetails from "./pages/GalleryDetails";
import Contact from "./pages/Contact";
import CartPage from "./pages/Cart";
import NotFound from "./pages/NotFound";
import NewsPage from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ScrollToTop from "./components/ScrollToTop";
import MustHavePage from "./pages/MustHavePage";
import DigitalWebServicesPage from "./pages/DigitalWebServices";
import MustHaveDetail from "./pages/MustHaveDetail";
import PhotoDetail from "./pages/PhotoDetail";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div>
        <ScrollToTop behavior="auto" />
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroCarousel />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/products/:id" element={<GalleryDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slugOrId" element={<NewsDetail />} />
          <Route path="/must-have" element={<MustHavePage />} />
          <Route path="/must-have/:slugOrId" element={<MustHaveDetail />} />
          <Route path="/services" element={<DigitalWebServicesPage />} />
          <Route path="*" element={<NotFound />} />
          {/* 404 səhifəsi */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
