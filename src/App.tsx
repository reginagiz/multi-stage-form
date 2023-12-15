import "./App.css";
import MainForm from "./components/MainForm";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  console.log("halhsdlfhlsdfh");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<MainForm />} />
      </Routes>
    </div>
  );
}

export default App;
