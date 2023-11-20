import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/SignUp.css";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  let { createUser } = useContext(UserContext);
  let navigate = useNavigate();

  const containerStyle = {
    backgroundImage: `url(${"https://webfoundation.org/docs/2017/03/March-12-Letter.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  function handleSubmit(event) {
    event.preventDefault();
    createUser(username, password, fullname, email, city, state, profilePicture)
      .then(() => {
        navigate("/");
        const successMessage = "Welcome, " + username + "!";
        showAlert(successMessage);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed registration: Error creating user.");
      });
  }
  function showAlert(message) {
    window.alert(message);
  }
  return (
    <>
      <div className="signup-wrap">
        <div className="signup-bg">
          <div className="divider d-flex align-items-center my-4">
            <h4 className="form-title text-center mx-3 mb-0">
              Sign Up for an Account
            </h4>
          </div>
          <Container style={containerStyle}>
            <Row>
              <Col className="signupimg" md={{ span: 7, offset: 3 }}>
                <form onSubmit={handleSubmit}>
                  <br />
                  <br></br>

                  <br></br>
                  <span>Username </span>
                  <input
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>Password </span>
                  <input
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>Full Name </span>
                  <input
                    placeholder="Enter Full Name"
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>Email </span>
                  <input
                    placeholder="Enter Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>City </span>
                  <input
                    placeholder="Enter City"
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>State </span>
                  <input
                    placeholder="Enter State"
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <br></br>
                  <br></br>
                  <span>Image URL</span>
                  <input
                    placeholder="Enter Image URL"
                    type="text"
                    name="profilePicture"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                  />
                  <br />
                  <br></br>
                  <button>
                    <strong>Create Account</strong>
                  </button>
                </form>

                <br />
                <br></br>
                <br />
                <br></br>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SignUp;
