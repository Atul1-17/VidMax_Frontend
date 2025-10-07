import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loader from "./Loader";

function ProtectedRoute() {

    const {isAuthenticated, status} = useSelector(state => state.auth);

    // Show loader while checking authentication status
    if (status === "loading") {
        return <Loader />
    }

    // If user is authenticated, show protected content
    if (isAuthenticated) {
        return <Outlet />
    }

    // If not authenticated and not loading, redirect to login
    return <Navigate to="/login" replace/>
}

export default ProtectedRoute

