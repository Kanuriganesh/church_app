// App.jsx
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Announcements from "./pages/Announcements"
import Events from "./pages/Events"
import Sermons from "./pages/Sermons"
import Gallery from "./pages/Gallery"
import Contact from "./pages/Contact"   
import Donate from "./pages/Donate"
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar/>
      <Routes>   
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />   
         <Route path="/donate" element={<Donate />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App