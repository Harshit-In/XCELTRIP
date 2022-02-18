import React from "react";
import Main from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Error404 from "./pages/error/Error404";
import Settings from "./pages/dashboard/Settings";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Error500 from "./pages/error/Error500";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQ from "./pages/Faq";
import needHeaderFooter from "./helpers/need_header_footer";

const Router = () => {
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName, needHeaderFooter?.[pathName]);
  const { isLoggedIn } = useSelector((state) => state?.user?.value);

  return (
    <>
      {needHeaderFooter?.[pathName] && !pathName.startsWith("/dashboard") && (
        <Navbar />
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/faq" element={<FAQ />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/error404" element={<Error404 />} />
        <Route exact path="/error500" element={<Error500 />} />
        <Route
          exact
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />}
        >
          <Route path=":page" element={<Dashboard />} />
        </Route>
      </Routes>

      {needHeaderFooter?.[pathName] && !pathName.startsWith("/dashboard") && (
        <Footer />
      )}
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default Router;
