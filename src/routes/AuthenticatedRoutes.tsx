import { useContext } from "react"
import { Context } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import { CircularProgress } from "@mui/material"


const AuthenticatedRoutes = () => {
    const { authenticated, loading } = useContext(Context)

    if (loading) {
        return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default AuthenticatedRoutes