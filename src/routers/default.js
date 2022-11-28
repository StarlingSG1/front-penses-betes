import {
  Route,
  BrowserRouter as Router,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "../pages";
import Login from "../pages/login.page";
import Logout from "../pages/logout.page";
import Register from "../pages/register.page";


export function DefaultRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />  
      </Routes>
    </BrowserRouter>
  );
}
