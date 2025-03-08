import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace/>
    //return isAuthenticated() ? <Navigate to="/" replace/> : <Navigate to="/login" replace/>
}

export default PrivateRoute;