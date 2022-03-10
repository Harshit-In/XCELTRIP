import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    /*  {
      channel: "Corporate",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    }, */
    {
      channel: "About Us",
      channelLink: "/about",
      icon: "fas fa-globe",
    },
    {
      channel: "FAQ",
      channelLink: "/faq",
      icon: "fas fa-globe",
    },
    {
      channel: "Terms & Condition",
      channelLink: "/terms",
      icon: "fas fa-globe",
    },
    /*  {
      channel: "Twitter",
      channelLink: "support@demo.com",
      icon: "fas fa-envelope-open",
    }, */
    /*  {
      channel: "Linkedin",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    },
    {
      channel: "Forum",
      channelLink: "https://www.demo.com",
      icon: "fas fa-globe",
    }, */
  ];
  return (
    <>
      <footer className="app-footer-bg app-footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="mb-2">
                <img
                  src="/theme_files/assets/logo_footer.png"
                  alt=""
                  style={{ height: "50px" }}
                />
              </div>
              <p>
                Founded in 2005, Yamgo is a UK-based technology company building
                a consumer-first rewards, incentivisation and fintech platform
                for advertising, media, retail and beyond.
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <h1 className="font-righteous text-white">Office</h1>
              <p>Technium 1, Kings Road, Swansea, SA1 8PH</p>
            </div>
            <div className="col-md-6 col-lg-4">
              <nav class="nav flex-column">
                {socialLinks.map((item) => (
                  <Link
                    className="nav-link text-muted my-1 py-0"
                    to={item.channelLink}
                    target="_parent"
                  >
                    <div>{item.channel}</div>
                  </Link>
                ))}
                <a
                  href="https://www.facebook.com/globaldefipool"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Facebook
                </a>
                <a
                  href="https://t.me/globaldefipoolofficial"
                  target="_blank"
                  className="nav-link text-muted my-1 py-0"
                >
                  Telegram
                </a>
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
