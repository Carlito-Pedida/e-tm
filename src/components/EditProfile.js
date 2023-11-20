import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../styles/EditProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const EditProfile = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();

  let [editProfile, setEditProfile] = useState({
    user_id: params.user_id,
    username: "",
    password: "",
    fullname: "",
    email: "",
    city: "",
    state: "",
    profilePicture: ""
  });

  let { updateUserProfile, getUserQaks } = useContext(UserContext);

  let {
    user_id,
    username,
    password,
    fullname,
    email,
    city,
    state,
    profilePicture
  } = editProfile;

  useEffect(() => {
    if (user_id !== undefined) return;
    async function fetch() {
      await getUserQaks(user_id, user).then((response) =>
        setEditProfile(response)
      );
    }
    fetch();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditProfile((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function updateProfile() {
    return updateUserProfile(editProfile);
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateProfile(editProfile)
      .then(() => {
        if (!editProfile.ok) {
          alert("Your Profile has been updated!");
        }
        navigate(`/profile/${user_id}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Profile edit unsuccesful");
        navigate(`/profile/${user_id}`);
      });
  }

  function handleCancel(event) {
    event.preventDefault();
    navigate(`/profile/${params.user_id}`);
  }

  return (
    <>
      <div className="edit-prof-wrap">
        <div className="edit-prof-case">
          <div className="divider d-flex align-items-center my-4">
            <h4 className="form-title text-center mx-3 mb-0">Edit Profile</h4>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                placeholder="Full Name"
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="ex. name@email.com"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="">
              <Col md>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="City"
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    placeholder="State"
                    type="text"
                    name="state"
                    value={state}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                placeholder="Image Link"
                type="text"
                name="profilePicture"
                value={profilePicture}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid mb-2">
              <Button size="sm" variant="primary" type="submit">
                Confirm Profile Update
              </Button>
            </div>
          </Form>
          <div className="d-grid mt-3">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
