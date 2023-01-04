import {
    Route,
    BrowserRouter as Router,
    Routes,
    BrowserRouter,
    Navigate,
  } from "react-router-dom";
import Home from "../pages";
import Profile from "../pages/profile.page";
import Logout from "../pages/logout.page";
  
  
  export function AuthRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          {/* <Route path="/account" element={<Profile />} /> */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    );
  }
  