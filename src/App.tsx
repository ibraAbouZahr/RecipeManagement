import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipeCrud from "./components/RecipeCrud";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/RecipeCrud" element={<RecipeCrud />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
