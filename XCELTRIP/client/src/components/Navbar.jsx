import { Link } from "react-router-dom";
import navbarMenus from "../helpers/navbar_menus";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          <img src="/theme_files/assets/logo-webf.png" alt="" style={{height:"20px"}}/>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {navbarMenus?.leftMenu && (
            <ul className="navbar-nav navbar-nav-hover align-items-lg-center mr-auto">
              {navbarMenus.leftMenu.map((menu) => (
                <li className="nav-item mr-2">
                  <Link to={menu.page} className="nav-link">
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {navbarMenus?.rightMenu && (
            <ul className="navbar-nav navbar-nav-hover align-items-lg-center ml-auto">
              {navbarMenus.rightMenu.map((menu) => (
                <li className="nav-item mr-2">
                  <Link to={menu.page} className="nav-link">
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
