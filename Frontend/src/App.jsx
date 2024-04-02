import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Protected from "./Protected";
import Employee from "./components/employee/Employee";
import SideBar from "./components/sidebar/SideBar";
import ProjectStatus from "./components/employee/ProjectStatus/ProjectStatus";
import Manager from "./components/manger/Manager";
import MProtected from "./MProtected";
import AsignTask from "./components/tasks/AsignTask";
import AllTask from "./components/tasks/AllTask";
import CompletedTask from "./components/tasks/CompletedTask";
import ReviewTask from "./components/tasks/ReviewTask";
import EmployeePerformance from "./components/manger/EmployeePerformance";
import Dashboard from "./components/tasks/dashboard/Dashboard";
import HoursEntry from "./components/employee/HoursEntry";
import HoursLog from "./components/employee/HoursLog";
import ProjectSubmitted from "./components/employee/ProjectSubmitted";
import Suggestion from "./components/employee/Suggestion";
function App() {


  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<MProtected Component={Register} />} />
      <Route path="/ProjectSubmitted" element={<Protected Component={ProjectSubmitted} />} />
      <Route path="/employee" element={<Protected Component={Employee} />} />
      <Route path="/hoursEntry" element={<Protected Component={HoursEntry} />} />
      <Route path="/taskCompleted" element={<Protected Component={ProjectStatus} />} />
      <Route path="/manager" element={<MProtected Component={AsignTask} />} />
      <Route path="/asignTask" element={<MProtected Component={AsignTask} />} />
      <Route path="/allTask" element={<MProtected Component={AllTask} />} />
      <Route path="/completedTask" element={<MProtected Component={CompletedTask} />} />
      <Route path="/reviewTask" element={<MProtected Component={ReviewTask} />} />
      <Route path="/employeePerformance" element={<MProtected Component={Dashboard} />} />
      <Route path="/hoursLog" element={<Protected Component={HoursLog} />} />
      <Route path="/suggestion" element={<Protected Component={Suggestion} />} />

      </Routes>
    </Router>
  )
}

export default App
