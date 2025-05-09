import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Details from "./pages/datails/Datails";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/restricted/Dashboard";
import AdminRoutes from "./routes/AdminRoutes";
import OrderHistory from "./pages/restricted/OrderHistory";
import OrderDetails from "./pages/restricted/OrderDetails";
import ProductRegister from "./pages/restricted/products/ProductRegister";
import ShowProducts from "./pages/restricted/products/ShowProducts";
import EditProduct from "./pages/restricted/products/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
               
        <Route element={<AdminRoutes />}>
          <Route path="/restricted/dashboard" element={<Dashboard />} />
          <Route path="/restricted/orderhistory" element={<OrderHistory />} />
          <Route path="/restricted/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/restricted/products/register" element={<ProductRegister />} />
          <Route path="/restricted/products/showproducts" element={<ShowProducts />} />
          <Route path="/restricted/products/editproduct/:id" element={<EditProduct />} />
        </Route>
        
        
      </Route>
    </Routes>
  );
}

export default App;