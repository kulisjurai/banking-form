import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages//login/Login";
import Signup from "./pages/signup/Signup";
import Layout from "./layout/Layout";
import Message from "./pages/message/Message";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
