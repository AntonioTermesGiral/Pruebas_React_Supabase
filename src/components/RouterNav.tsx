import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Login from "./Login";
import Skeleton from "./Skeleton";
import Test from "./Test";

const RouterNav = () => {

    return (
        <Router>
            <Routes>
                <Route path="*" element={<Skeleton content={<div/>}/>}/>
                <Route path="/Games" element={<Skeleton content={<Test />}/>}/>
                <Route path="/Login" element={<Skeleton content={<Login />}/>}/>
            </Routes>
        </Router>
    )

}

export default RouterNav