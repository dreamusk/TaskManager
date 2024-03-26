import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Notes from "./components/notes/Notes";
import Login from "./components/login/Login";
import Protected from "./Protected";
import Employee from "./components/employee/Employee";
import SideBar from "./components/sidebar/SideBar";
import TaskCompleted from "./components/taskCompleted/TaskCompleted";
import Manager from "./components/manger/Manager";
import MProtected from "./MProtected";
import AsignTask from "./components/tasks/AsignTask";
import AllTask from "./components/tasks/AllTask";
import CompletedTask from "./components/tasks/CompletedTask";
import ReviewTask from "./components/tasks/ReviewTask";
import EmployeePerformance from "./components/manger/EmployeePerformance";
import Dashboard from "./components/tasks/dashboard/Dashboard";
function App() {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Notes />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Protected Component={Notes} />} />
      <Route path="/employee" element={<Protected Component={Employee} />} />
      <Route path="/taskCompleted" element={<Protected Component={TaskCompleted} />} />
      <Route path="/manager" element={<MProtected Component={Manager} />} />
      <Route path="/asignTask" element={<MProtected Component={AsignTask} />} />
      <Route path="/allTask" element={<MProtected Component={AllTask} />} />
      <Route path="/completedTask" element={<MProtected Component={CompletedTask} />} />
      <Route path="/reviewTask" element={<MProtected Component={ReviewTask} />} />
      <Route path="/employeePerformance" element={<MProtected Component={Dashboard} />} />

      </Routes>
    </Router>
  )
}

export default App
