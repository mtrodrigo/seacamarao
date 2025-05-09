import { useContext } from "react"
import { Context } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import { CircularProgress } from "@mui/material"


const AdminRoutes = () => {
    const { authenticated, isAdmin, loading } = useContext(Context)

    if (loading) {
        return <CircularProgress style={{ color: "#e4e4e7" }} size={40} />;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default AdminRoutes