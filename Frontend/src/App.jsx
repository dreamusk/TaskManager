import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Notes from "./components/notes/Notes";
import Login from "./components/login/Login";
import Protected from "./Protected";
import Employee from "./components/employee/Employee";
import SideBar from "./components/sidebar/SideBar";
function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Notes />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Protected Component={Notes} />} />
      <Route path="/employee" element={<Protected Component={Employee} />} />
      <Route path="/sidebar" element={<Protected Component={SideBar} />} />
      </Routes>
    </Router>
  )
}

export default App
