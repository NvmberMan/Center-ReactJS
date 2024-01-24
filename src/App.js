import "./App.css";
import './StylistComponent/gamelist.css';
import './StylistComponent/navbar.css';
import './StylistComponent/footer.css';
import './StylistComponent/responsive.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
