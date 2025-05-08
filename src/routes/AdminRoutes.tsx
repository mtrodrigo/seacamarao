import { useContext } from "react"
import { Context } from "../contexts/UserContext"
import { Navigate, Outlet } from "react-router-dom"


const AdminRoutes = () => {
    const { authenticated, isAdmin } = useContext(Context)

    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default AdminRoutes