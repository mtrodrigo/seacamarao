import BodyContainer from "../containers/BodyContainer";
import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";
import {Footer} from "../footer/Footer"

const Layout = () => {
  return (
    <>
      <BodyContainer>
        <Header />
        <Outlet />
        <Footer />
      </BodyContainer>
    </>
  );
};

export default Layout;
