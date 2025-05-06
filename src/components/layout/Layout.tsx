import BodyContainer from "../containers/BodyContainer";
import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";
import {Footer} from "../footer/Footer"
import { Toaster } from "react-hot-toast";

const Layout = () => {
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
