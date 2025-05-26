import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeCrud from "./components/RecipeCrud";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RecipeCrud" element={<RecipeCrud />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
