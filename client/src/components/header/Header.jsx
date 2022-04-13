import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import pic from "./logo-large.png";
import { Button } from "@material-ui/core";

function Header() {
 const user = JSON.parse(localStorage.getItem("user"));
 // console.log(user);
  const navigate = useNavigate();
  function handlelogout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar navbar-light static-top"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container">
          <Link to="/" style={{ textDecoration: "none", border: "none" }}>
            <img src={pic} style={{ border: "0" }} alt="..." height="36" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {`${user.firstname} ${user.lastname}`}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      classNameName="dropdown-item"
                      style={{
                        textDecoration: "none",
                        marginLeft: "14px",
                        color: "black",
                      }}
                      to="/profile"
                    >
                      Profile
                    </Link>{" "}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link
                      classNameName="dropdown-item"
                      style={{
                        textDecoration: "none",
                        marginLeft: "14px",
                        color: "black",
                      }}
                      to="/post"
                    >
                      Post
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                   
                    <Button onClick={handlelogout}>Logout</Button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
