import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import Details from "./pages/datails/Datails"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
