import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    {
      channel: "Corporate",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    },
    {
      channel: "Terms & Condition",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    },
    {
      channel: "Twitter",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    },
    {
      channel: "Linkedin",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    },
    {
      channel: "Forum",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    },
  ];
  return (
    <>
      <footer className="app-footer-bg app-footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <p>
                Founded in 2005, Yamgo is a UK-based technology company building
                a consumer-first rewards, incentivisation and fintech platform
                for advertising, media, retail and beyond.
              </p>
            </div>
            <div className="col-md-6 col-lg-3">
              <h2 className="font-righteous text-light">Office</h2>
              <p>Technium 1, Kings Road, Swansea, SA1 8PH</p>
            </div>
            <div className="col-md-6 col-lg-3">
              <nav class="nav flex-column">
                {socialLinks.map((item) => (
                  <Link
                    className="nav-link text-muted my-1 py-0"
                    to={item.channelLink}
                    target="_blank"
                  >
                    <div>{item.channel}</div>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="col-md-6 col-lg-3">
              <nav class="nav flex-column">
                {socialLinks.map((item) => (
                  <Link
                    className="nav-link text-muted my-1 py-0"
                    to={item.channelLink}
                    target="_blank"
                  >
                    <div>{item.channel}</div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <div className="container-fluid foot-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>Copyrights © 2022. All Rights Reserved</div>
          <div>Registered in England and Wales Company Number: 3597254</div>
        </div>
      </div>
    </>
  );
}
