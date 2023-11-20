import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import UserContext from "../contexts/UserContext";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/NoProfile.css";

const NoProfile = () => {
  const params = useParams();
  let navigate = useNavigate();
  const [noLoggedUser, setNoLoggedUser] = useState([]);

  let { getOneUserQak } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getOneUserQak(params.user_id).then((result) =>
        setNoLoggedUser(result)
      );
    }
    fetchData();
  }, [getOneUserQak, params.user_id]);

  function profileCard() {
    const {
      username,
      email,
      fullname,
      city,
      state,
      createdAt,
      profilePicture,
      Qaks
    } = noLoggedUser;

    return (
      <div>
        <div className="prof-wrap">
          <div className="prof-case">
            <div className="profile-section">
              <div>
                <div>
                  <Row>
                    <Col
                      className="col-sm-12 col-md-12 col-lg-4"
                      key={params.user_id}
                    >
                      <div>
                        <Card className="p-2">
                          <Card.Body className="text-center">
                            <img
                              src={profilePicture}
                              alt=""
                              className="rounded-circle img-fluid"
                              style={{ width: "150px", height: "150px" }}
                            />
                            <Card.Title>{username}</Card.Title>
                            <Card.Title>{email}</Card.Title>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                    <Col className="col-sm-12 col-md-12 col-lg-8 ">
                      <Card>
                        <Card.Body>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <div className="bio">
                                <strong>Full Name:</strong> <p>{fullname}</p>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div className="bio">
                                <strong>City:</strong> <p>{city}</p>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div className="bio">
                                <strong>State:</strong> <p>{state}</p>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div className="bio">
                                <strong>Member Since:</strong>{" "}
                                <p>
                                  {moment
                                    .parseZone(createdAt)
                                    .local()
                                    .format("LL")}
                                </p>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <br />

            <Link
              className="backtext"
              variant="link"
              onClick={() => navigate(-1)}
            >
              <div className="d-flex justify-content-start">
                <FaArrowLeft className="arrow" size={"25px"} />
                <h5 className="arrow ps-2">Go Back</h5>
              </div>
            </Link>

            <div>
              <div className="row">
                <div className="col-md-12">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      {username}'s Qaks
                    </h4>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body" style={{ fontSize: "16px" }}>
                      <br />
                      <div className="q-card mb-4" key={username}>
                        {Qaks?.sort(
                          (a, b) =>
                            moment(b.createdAt).valueOf() -
                            moment(a.createdAt).valueOf()
                        ).map((q, idx) => {
                          return (
                            <div key={idx}>
                              <div className="q">
                                <div>
                                  <h4>{username}</h4>
                                </div>
                                <p>{q.qak}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return profileCard();
};

export default NoProfile;
