import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Offcanvas, Stack } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import "../styles/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import SignIn from "./SignIn";
import UserContext from "../contexts/UserContext";

const Navigation = () => {
  const [loggedUser, setLoggedUser] = useState([]);

  let { getUserQaks } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const result = await getUserQaks();
        if (isMounted) {
          setLoggedUser(result);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response && error.response.status === 404) {
            console.clear();
          }
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const [, setQuery] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const [showSignInModal, setShowSignInModal] = useState(false);

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggleSearchModal = () => setSearchModalVisible(!searchModalVisible);

  let { user_id } = useParams();

  function avatar() {
    let { fullname, profilePicture } = loggedUser;

    return (
      <>
        <>
          {[false, "sm", "md", "lg", "xl", "xxl"].map((expand, index) => (
            <Navbar className="nav-bar" fixed="top" expand="lg" key={index}>
              <div className="nav-wrap">
                <Navbar.Brand className="ms-4" href="/">
                  <div className="brand-logo d-flex align-items-center">
                    <img
                      alt=""
                      src="logo.png"
                      width="40"
                      height="40"
                      className="brand me-2"
                    />{" "}
                    E - TM
                  </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title
                        id={`offcanvasNavbarLabel-expand-${expand}`}
                      >
                        Offcanvas
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="text-secondary">
                      <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
                        <Link to="/" className="nav-link">
                          <strong>HOME</strong>
                        </Link>

                        {loggedUser.user_id && (
                          <React.Fragment>
                            <Link
                              to={`/profile/${loggedUser.user_id}`}
                              className="nav-link"
                              key={user_id}
                            >
                              <span>
                                <img
                                  src={profilePicture}
                                  className="img-border rounded-circle"
                                  alt=""
                                  height={35}
                                  width={35}
                                />
                              </span>
                              <span>
                                {" "}
                                <strong className="prof-name">
                                  HELLO {fullname}!
                                </strong>
                              </span>
                            </Link>

                            <Link to={"/signout"} className="nav-link">
                              <strong>SIGN OUT</strong>
                            </Link>
                          </React.Fragment>
                        )}
                        {!loggedUser.user_id && (
                          <React.Fragment>
                            <Link to="/signup" className="nav-link">
                              <strong>SIGN UP</strong>
                            </Link>
                            <Link
                              to={openSignInModal}
                              className="nav-link"
                              onClick={openSignInModal}
                            >
                              <strong>SIGN IN</strong>
                            </Link>
                          </React.Fragment>
                        )}
                        <Link to="/rssfeed" className="nav-link">
                          <strong>RSS Feed</strong>
                        </Link>
                        <Link to="/qaks" className="nav-link">
                          <strong>QAK</strong>
                        </Link>

                        <Link className="nav-link">
                          <FontAwesomeIcon
                            className="search-tool"
                            onClick={toggleSearchModal}
                            icon={faSearch}
                            size="xl"
                          />
                        </Link>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Navbar.Collapse>
              </div>
            </Navbar>
          ))}

          <Search
            show={searchModalVisible}
            handleClose={toggleSearchModal}
            setQuery={setQuery}
          />

          <Stack gap={3} className="col-md-10 mx-auto mt-3">
            <Outlet />
          </Stack>
          <SignIn
            show={showSignInModal}
            handleClose={closeSignInModal}
            handleSubmit={handleSubmit}
          />
        </>
      </>
    );
  }
  return avatar();
};

export default Navigation;
