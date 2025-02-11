import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import NoteCard from "./components/NoteCard";
import Create from "./components/Create";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/view" element={<NoteCard />} />
              <Route path="/create" element={<Create />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
