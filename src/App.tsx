import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import Details from "./pages/datails/Datails"
import About from "./pages/about/About"
import Login from "./pages/login/Login"
import Register from "./pages/login/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
