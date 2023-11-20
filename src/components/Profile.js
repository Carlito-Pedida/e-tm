import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import moment from "moment";
import NewQak from "./NewQak";
import { Card, Col, ListGroup, Row, Accordion } from "react-bootstrap";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import QakContext from "../contexts/QakContext";
import QakReplyContext from "../contexts/QakReplyContext";

const Profile = ({ user }) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState([]);
  const [userConnect, setUserConnect] = useState([]);

  const baseUrl = "http://localhost:3000/api/users";

  let { getUserQaks } = useContext(UserContext);

  let { deleteQak } = useContext(QakContext);
  let { deleteQakReply } = useContext(QakReplyContext);

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getUserQaks(params.user_id).then((result) => setLoggedUser(result));
    }
    fetchData();
  }, [getUserQaks, params.user_id]);

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  function getAllUsers() {
    return axios.get(baseUrl).then((response) => setUserConnect(response.data));
  }

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRssFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rss/feeds");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
      }
    };

    fetchRssFeeds();
  }, []);

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

  function handleDelete(qak_id) {
    if (user) {
      window.alert("You are not allowed to perform this operation");
      navigate("/qaks");
    } else {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (confirmDelete) {
        deleteQak(qak_id)
          .then(() => {
            navigate(window.location.reload());
          })
          .catch((error) => {
            console.log(error);
            window.alert("You need to sign in to perform this operation");
            navigate(window.location);
          });
      }
    }
  }

  function handleDeleteQakReply(qakReply_id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteQakReply(qakReply_id)
        .then(() => {
          navigate("/qaks");
        })
        .catch((error) => {
          console.log(error);
          window.alert("You need to sign in to perform this operation");
          navigate("/qaks");
        });
    }
  }

  function profileCard() {
    let {
      user_id,
      username,
      fullname,
      email,
      city,
      state,
      createdAt,
      profilePicture,
      Qaks,
      QakReplies,
      User
    } = loggedUser;
    let qaksByUser = [];
    qaksByUser.push({ Qaks });
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
                            <div>
                              <Link
                                type="button"
                                className="btn btn-primary btn-sm"
                                to={openSignInModal}
                                onClick={openSignInModal}
                              >
                                New QAK
                              </Link>

                              <NewQak
                                show={showSignInModal}
                                handleClose={closeSignInModal}
                                handleSubmit={handleSubmit}
                              />
                            </div>
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
                          <div className="d-flex justify-content-center">
                            <Link
                              type="button"
                              className="btn btn-primary btn-sm"
                              to={`/profile/${user_id}/edit`}
                            >
                              Edit Profile
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-8">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      {username}'s Qaks
                    </h4>
                  </div>

                  <QakContext.Consumer>
                    {({ qak }) => {
                      return (
                        <div className="qak-wrap">
                          <div className="qak-case">
                            <div>
                              {qak.map((q) => {
                                console.log(qak.User);
                                return (
                                  <div
                                    key={q.qak_id}
                                    style={{ marginBottom: "15px" }}
                                  >
                                    <Accordion defaultActiveKey={null}>
                                      <Accordion.Item>
                                        <Accordion.Header>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center"
                                            }}
                                          >
                                            <div>
                                              {loggedUser &&
                                              q.user_id ==
                                                loggedUser.user_id ? (
                                                <Link
                                                  to={`/profile/${q.user_id}`}
                                                >
                                                  <h4>{q.User.username}</h4>
                                                </Link>
                                              ) : (
                                                <Link
                                                  to={`/noprofile/${q.user_id}`}
                                                >
                                                  <h4>{q.User.username}</h4>
                                                </Link>
                                              )}
                                              <p>{q.qak}</p>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center"
                                                }}
                                              >
                                                <p>
                                                  {q.updatedAt &&
                                                  !moment(q.createdAt).isSame(
                                                    q.updatedAt,
                                                    "day"
                                                  )
                                                    ? `Edited: ${moment(
                                                        q.updatedAt
                                                      ).format("MM/DD/YYYY")}`
                                                    : `Created: ${moment(
                                                        q.createdAt
                                                      ).format("MM/DD/YYYY")}`}
                                                </p>
                                                {loggedUser &&
                                                q.user_id ==
                                                  loggedUser.user_id ? (
                                                  <div className="d-flex justify-content-end">
                                                    <p
                                                      style={{
                                                        marginLeft: "auto"
                                                      }}
                                                    >
                                                      <Link
                                                        className="ms-3"
                                                        to={`/qaks/${q.qak_id}/edit`}
                                                        style={{
                                                          marginRight: "10px"
                                                        }}
                                                      >
                                                        <FaRegEdit
                                                          size={"23px"}
                                                          color="purple"
                                                        />
                                                      </Link>
                                                      <Link
                                                        to={"#"}
                                                        onClick={handleDelete.bind(
                                                          this,
                                                          q.qak_id,
                                                          q.user_id
                                                        )}
                                                      >
                                                        <FaTrashAlt
                                                          className="trash"
                                                          size={"20px"}
                                                          color="green"
                                                        />
                                                      </Link>
                                                    </p>
                                                  </div>
                                                ) : (
                                                  <></>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          {/* Add a line space here */}
                                          <hr style={{ margin: "10px 0" }} />
                                        </Accordion.Header>

                                        <Accordion.Body>
                                          <div className="text-center">
                                            <Link
                                              to={`/qakReply/new/${q.qak_id}`}
                                            >
                                              Provide An Answer or Share
                                              Knowledge
                                            </Link>
                                          </div>
                                          {q.QakReplies &&
                                          q.QakReplies.length > 0 ? (
                                            <div>
                                              {q.QakReplies.map(
                                                (QakReplies) => (
                                                  <div
                                                    key={QakReplies.qakReply_id}
                                                    style={{
                                                      marginBottom: "15px"
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                      }}
                                                    >
                                                      <div>
                                                        <Link
                                                          to={`/noprofile/${QakReplies.User.user_id}`}
                                                        >
                                                          <h4>
                                                            {
                                                              QakReplies.User
                                                                .username
                                                            }
                                                          </h4>
                                                        </Link>
                                                        <p>
                                                          {QakReplies.qakReply}
                                                        </p>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            alignItems: "center"
                                                          }}
                                                        >
                                                          <p>
                                                            {QakReplies.updatedAt &&
                                                            !moment(
                                                              QakReplies.createdAt
                                                            ).isSame(
                                                              QakReplies.updatedAt,
                                                              "day"
                                                            )
                                                              ? `Edited: ${moment(
                                                                  QakReplies.updatedAt
                                                                ).format(
                                                                  "MM/DD/YYYY"
                                                                )}`
                                                              : `Created: ${moment(
                                                                  QakReplies.createdAt
                                                                ).format(
                                                                  "MM/DD/YYYY"
                                                                )}`}
                                                          </p>
                                                          {loggedUser &&
                                                          QakReplies.User
                                                            .user_id ==
                                                            loggedUser.user_id ? (
                                                            <div className="d-flex justify-content-end">
                                                              <p
                                                                style={{
                                                                  marginLeft:
                                                                    "auto"
                                                                }}
                                                              >
                                                                <Link
                                                                  className="ms-3"
                                                                  to={`/qakReply/edit/${QakReplies.qakReply_id}`}
                                                                  style={{
                                                                    marginRight:
                                                                      "10px"
                                                                  }}
                                                                >
                                                                  <FaRegEdit
                                                                    size={
                                                                      "23px"
                                                                    }
                                                                    color="purple"
                                                                  />
                                                                </Link>
                                                                <Link
                                                                  to={"#"}
                                                                  onClick={handleDeleteQakReply.bind(
                                                                    this,
                                                                    QakReplies.qakReply_id,
                                                                    QakReplies
                                                                      .User
                                                                      .user_id
                                                                  )}
                                                                >
                                                                  <FaTrashAlt
                                                                    className="trash"
                                                                    size={
                                                                      "20px"
                                                                    }
                                                                    color="green"
                                                                  />
                                                                </Link>
                                                              </p>
                                                            </div>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    {/* Add a line space here */}
                                                    <hr
                                                      style={{
                                                        margin: "10px 0"
                                                      }}
                                                    />
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          ) : (
                                            <p>
                                              No replies available for this QAK.
                                            </p>
                                          )}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </QakContext.Consumer>
                </div>
                <div className="col-12 col-md-12 col-lg-4">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="latest text-center mx-3 mb-0">
                      Latest Tech News
                    </h4>
                  </div>

                  <div>
                    <div className="card mb-4 p-2">
                      <div className="card-body">
                        <Link className="text-dec" to={"/rssfeed"}>
                          {/* Place your content for Featured Article 1 here */}
                          <hr />
                          {articles.slice(1, 3).map((item, idx) => (
                            <div key={idx}>
                              <h5 className="text-hove">{item.title}</h5>
                              <p className="text-hove">{item.contentSnippet}</p>
                              <hr />
                            </div>
                          ))}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Card>
                    <Card.Header>
                      <strong>{username}'s Connections</strong>
                    </Card.Header>
                    <div className="col-12">
                      <Card.Body className="commenter-list">
                        {userConnect.slice(1, 6).map((user, id) => (
                          <ListGroup key={id}>
                            <div className="top-com">
                              <Link
                                to={`/noprofile/${user.user_id}`}
                                className="top-com-link"
                              >
                                <ListGroup.Item>
                                  <img
                                    key={id}
                                    className="tc-img"
                                    alt="avatar"
                                    src={user.profilePicture}
                                  />

                                  {user.fullname}
                                </ListGroup.Item>
                              </Link>
                            </div>
                          </ListGroup>
                        ))}
                      </Card.Body>
                    </div>
                  </Card>
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
export default Profile;
