import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Skeleton from "./Skeleton";
import Games from "./Games";
import Library from "./Library";
import Users from "./Users";
import Profile from "./Profile";
import LoginDialog from "./LoginDialog";

const RouterNav = () => {

    return (
        <Router>
            <Routes>
                <Route path="*" element={<Skeleton content={<div/>}/>}/>
                <Route path="/Games" element={<Skeleton content={<Games />}/>}/>
                <Route path="/Login" element={<Skeleton content={<Login />}/>}/>
                <Route path="/Logout" element={<Skeleton content={<Logout />}/>}/>
                <Route path="/Library" element={<Skeleton content={<Library />}/>}/>
                <Route path="/Users" element={<Skeleton content={<Users />}/>}/>
                <Route path="/Profile" element={<Skeleton content={<Profile />}/>}/>
                <Route path="/LD" element={<Skeleton content={<LoginDialog />}/>}/>
            </Routes>
        </Router>
    )

}

export default RouterNav