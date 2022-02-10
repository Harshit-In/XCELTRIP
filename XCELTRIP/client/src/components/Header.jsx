import React from "react";
import {Link} from 'react-router-dom';
export default function Header() {
  return (
    <>
    <div className="site-navbar site-navbar-target" style={{background:"#139913e0",height:"56px"}}>
    <div className="">
          <div className="row ">
            <div className="col-6 col-md-2 col-lg-2">
              <h1 className="my-0 site-logo">
                  <a href="/">
      <img src="images/fastearn_2.png" style={{width:"180px"}} />
			  </a>
              </h1>
            </div>
            <div className="col-5 col-md-1 col-lg-9 mt-4">
              <nav className="site-navigation text-right" role="navigation">
                <div className="container">
                
                  <ul className="site-menu main-menu js-clone-nav ">
                    
                  <div id="google_translate_element"></div>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-1 col-md-1 col-lg-1" style={{background:"#f2b509",borderLeft: "2px solid #fff",height:"56px"}}>
              <nav className="site-navigation text-right" role="navigation">
                <div className="container">
                  

                </div>
              </nav>
            </div>
          </div>
        </div>
    </div>
    {/* second nav */}
    <div className="site-mobile-menu site-navbar-target ">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body"></div>
    </div> 
    <div className="site-navbar-wrap  "  style={{background:"#139913e0",borderTop: "2px solid #fff"}}>
      <div className="site-navbar-top">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="d-flex mr-auto">
                <a href="#" className="d-flex align-items-center mr-4">
                  <span className="icon-envelope mr-2"></span>
                  <span className="d-none d-md-inline-block"></span>
                </a>
                <a href="#" className="d-flex align-items-center mr-auto">
                  <span className="icon-phone mr-2"></span>
                  <span className="d-none d-md-inline-block"></span>
                </a>
              </div>
            </div>
            <div className="col-6 text-right">
              <div className="mr-auto">
                <a href="#" className="p-2 pl-0"><span className="icon-twitter"></span></a>
                <a href="#" className="p-2 pl-0"><span className="icon-facebook"></span></a>
                <a href="#" className="p-2 pl-0"><span className="icon-linkedin"></span></a>
                <a href="#" className="p-2 pl-0"><span className="icon-instagram"></span></a>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <div className="site-navbar site-navbar-target js-sticky-header" >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-10 col-lg-10">
              <nav className="site-navigation text-right" role="navigation">
                <div className="container">
                  <div className="d-inline-block d-lg-none ml-md-0 mr-auto py-3">
                    <a href="#" className="site-menu-toggle js-menu-toggle text-white">
                        <span className="icon-menu h3"></span>
                    </a>
                </div>
                  <ul className="site-menu main-menu js-clone-nav d-none d-lg-block">
                    <li><a href="#home-section" className="nav-link">Home</a></li>
                    <li><a href="#Aboutus" className="nav-link">About Us</a></li>
                    <li><a href="#Business_Plan" className="nav-link">PPT</a></li>
                    <li><a href="#Contact_us" className="nav-link">Contact Us</a></li>
                  
                    <li className="p-1 m-1"><Link to="/new_login" className="launchs">Login</Link></li>
                    <li className="p-1 m-1"><Link to="/create" className="launchs">Create Account</Link></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
