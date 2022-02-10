import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import $ from "jquery";
import { Link } from "react-router-dom";
import Ourteam from "./Ourteam";
export default function Home() {

  const Contactus = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
  }

  useEffect(() => {
    setTimeout(() => {
      window.jQuery("#testimonial-slider").owlCarousel({
        items: 2,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [979, 2],
        itemsMobile: [320, 1],
        itemsTablet: [768, 1],
        pagination: true,
        autoPlay: true,
      });
      //   partical("tsparticles");
    }, 800);
  }, []);


  return (
    <>
      <Header />
      <section className="sliders" >
        <div className="container" style={{ marginTop: "8%", marginBottom: "8%" }}>
          <div className="row">
            <div className="col-xs-12 col-md-8" style={{ background: "#ffb000", border: "2px solid #139913e0" }}>
              <div className="text-container">
                <h4 className="text-white text-center">My Fastearn</h4>
                <p className="lfts text-white" style={{ fontSize: "17px" }}>
                  Our company is managed by group of professionals having 10+ years of Experience &  Knowledge in Direct Selling Industry. Company is providing the best Health Care Products, Personal Care Products, Kitchen Appliances, Home Decor Products, FMCG Products & Electric Vehicles. Company has already planned for futuristic approach for distributors.
                  Company has designed its business plan in such a way that the best marketing plan with Unilevel Income more over stable residual income to its members.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-md-4">
              <div style={{ border: "1px solid" }}>
                <img src="images/product banner.png" style={{ width: "100%",height:"300px" }} />
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="section3" id="Aboutus">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="text-container">
                <h4>About Fastearn</h4>
                <p className="lfts">
                  My fastearn is now becoming a leading direct selling company dealing in world class wellness products. My fastearn is constantly growing at a phenomenal rate every year. The growth rate in itself speaks volumes about the quality of the products, the marketing plan and the management that has been able to deliver such a rewarding and sustainable system.

                  Myfastearn is constantly expanding its product range to introduce innovative products every year, manufactured at state-of-the-art manufacturing facilities, which are GMP and Halal certified. With over 3000+ online and offline sales outlets pan India, multiple international offices and several distributor centres, fastearn has been building a widespread network of distributors, which is constantly growing every year.

                  Myfastearn believes in empowering its members with the opportunity to lead their lives on their own terms. With the motto of spreading Wellth, i.e. spreading wealth through wellness, Myfastearn has continued to enrich the lives of everyone who is a part of the company and those who believe in its products.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-md-6">

              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src="images/herbal shampoo img.jpg" alt="First slide" />
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="images/immunity_22.jpg" alt="Second slide" />
                  </div>
                  {/* <div class="carousel-item">
                    <img class="d-block w-100" src="images/p1.png" alt="Third slide" />
                  </div> */}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="section5" id="Contact_us">
        <div className="layer">
          <div className="container ">

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="text-container">
                  <h4></h4>
                  <p className="ghgkk text-dark" > <i class="fa fa-envelope-o" aria-hidden="true" />&nbsp;
                    info@myfastearn.in</p>
                  <p className="ghgkk text-dark"><i className="fas fa-mobile" />&nbsp; 9638524590</p>
                  <p className="ghgkk text-dark"> <i className="fa fa-map-marker" />&nbsp; xyz,Uttar Pradesh </p>
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div className="text-container">
                  <h4 className="mb-2" style={{ color: "#051304" }}>Get In Touch</h4>
                  <form onSubmit={(event) => { Contactus(event) }} >
                    <div class="row">
                      <div class="col-sm-6 form-group">
                        <input class="form-control" id="name" name="name" placeholder="Name" type="text" required />
                      </div>
                      <div class="col-sm-6 form-group">
                        <input class="form-control" id="email" name="email" placeholder="Email" type="email" required />
                      </div>
                    </div>
                    <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
                    <br />
                    <div class="row">
                      <div class="col-md-12 form-group text-center">
                        <div className=""> <button class=" fdfgf" type="submit">Send</button></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section3" id="Aboutus">
        <div className="container">
        <h2 className="text-dark text-center mt-5">Meet Our Team</h2>
<Ourteam/>

        </div>
      </section>

      {/* </section> */}

      <section className="section4" id="Business_Plan">
        {/* <div id="particles">
          <div id="tsparticles4"></div>
        </div> */}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="text-containers">
                <h4>Know more about FastEarn</h4>
                {/* <p className="rlts">
                  Working Mechanism, Platform Architecture, Benefits, Rewards,
                  Etc.
                </p> */}
                <div>
                  <a
                    href="images/New myfastearn.in.pdf"
                    className="launchsd"
                  >
                    Business Plan
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6">
              <div className="img-containers">
                <img src="images/coin.gif" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
