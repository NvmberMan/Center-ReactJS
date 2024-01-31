import "./App.css";
import './StylistComponent/gamelist.css';
import './StylistComponent/navbar.css';
import './StylistComponent/footer.css';
import './StylistComponent/responsive.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Detail from "./Pages/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/detail/:slug" element={<Detail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
