import BodyContainer from "../containers/BodyContainer";
import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { Context } from "../../contexts/UserContext";
import { CircularProgress } from "@mui/material";

const Layout = () => {
  const { loading } = useContext(Context);

  if (loading) {
    return (
      <BodyContainer>
        <CircularProgress style={{ color: "#e4e4e7" }} size={40} />
      </BodyContainer>
    );
  }

  return (
    <>
      <BodyContainer>
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <Outlet />
        <Footer />
      </BodyContainer>
    </>
  );
};

export default Layout;
