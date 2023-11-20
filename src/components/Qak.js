import React, { useContext, useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import QakContext from "../contexts/QakContext";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles/Qak.css";
import NewQak from "./NewQak";
import QakReplyContext from "../contexts/QakReplyContext";
import UserContext from "../contexts/UserContext";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const Qak = () => {
  let navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState([]);

  let { deleteQak } = useContext(QakContext);
  let { deleteQakReply } = useContext(QakReplyContext);
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

  function handleDelete(qak_id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteQak(qak_id)
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

  const [filter, setFilter] = useState("7"); // Initialize the filter as "within 7 days"

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

  return (
    <QakContext.Consumer>
      {({ qak }) => {
        console.log(qak);
        const filterQAKs = (qakData) => {
          const now = moment();
          if (filter === "today") {
            return qakData
              .filter((q) => now.isSame(q.createdAt, "day"))
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "yesterday") {
            return qakData
              .filter((q) =>
                now.clone().subtract(1, "day").isSame(q.createdAt, "day")
              )
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "1month") {
            const oneMonthAgo = now.clone().subtract(1, "month");
            return qakData
              .filter((q) => q.createdAt.isSameOrAfter(oneMonthAgo))
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else if (filter === "older") {
            const oneMonthAgo = now.clone().subtract(1, "month");
            return qakData
              .filter((q) => moment(q.createdAt).isBefore(oneMonthAgo))
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          } else {
            return qakData
              .filter((q) => now.diff(q.createdAt, "days") <= 7)
              .sort(
                (b, a) =>
                  moment(b.createdAt || b.updatedAt).valueOf() -
                  moment(a.createdAt || a.updatedAt).valueOf()
              );
          }
        };

        const filteredQAKs = filterQAKs(qak);

        return (
          <div className="qak-wrap">
            <div className="qak-case">
              <div>
                <div className="divider d-flex align-items-center my-4">
                  <h4 className="form-title text-center mx-3 mb-0">
                    Question Answer Knowledge
                  </h4>
                </div>
                <div className="text-center">
                  <Link to={openSignInModal} onClick={openSignInModal}>
                    Create A Question or Share Knowledge
                  </Link>

                  <NewQak
                    show={showSignInModal}
                    handleClose={closeSignInModal}
                    handleSubmit={handleSubmit}
                  />
                </div>

                <div className="text-center">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="7">Within 7 days</option>
                    <option value="30">Within 30 days</option>
                    <option value="older">Older</option>
                  </select>
                </div>
              </div>
              <div className="content-below-top-panel">
                {filteredQAKs.map((q) => {
                  return (
                    <div key={q.qak_id} style={{ marginBottom: "15px" }}>
                      <Accordion defaultActiveKey={null}>
                        <Accordion.Item>
                          <Accordion.Header>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                {loggedUser &&
                                q.user_id == loggedUser.user_id ? (
                                  <Link to={`/profile/${q.user_id}`}>
                                    <h4>{q.User.username}</h4>
                                  </Link>
                                ) : (
                                  <Link to={`/noprofile/${q.user_id}`}>
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
                                      ? `Edited: ${moment(q.updatedAt).format(
                                          "MM/DD/YYYY"
                                        )}`
                                      : `Created: ${moment(q.createdAt).format(
                                          "MM/DD/YYYY"
                                        )}`}
                                  </p>
                                  {loggedUser &&
                                  q.user_id == loggedUser.user_id ? (
                                    <div className="d-flex justify-content-end">
                                      <p style={{ marginLeft: "auto" }}>
                                        <Link
                                          className="ms-3"
                                          to={`/qaks/${q.qak_id}/edit`}
                                          style={{ marginRight: "10px" }}
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
                              <Link to={`/qakReply/new/${q.qak_id}`}>
                                Provide An Answer or Share Knowledge
                              </Link>
                            </div>
                            {q.QakReplies && q.QakReplies.length > 0 ? (
                              <div>
                                {q.QakReplies.map((QakReplies) => (
                                  <div
                                    key={QakReplies.qakReply_id}
                                    style={{ marginBottom: "15px" }}
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
                                          <h4>{QakReplies.User.username}</h4>
                                        </Link>
                                        <p>{QakReplies.qakReply}</p>
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
                                                ).format("MM/DD/YYYY")}`
                                              : `Created: ${moment(
                                                  QakReplies.createdAt
                                                ).format("MM/DD/YYYY")}`}
                                          </p>
                                          {loggedUser &&
                                          QakReplies.User.user_id ==
                                            loggedUser.user_id ? (
                                            <div className="d-flex justify-content-end">
                                              <p style={{ marginLeft: "auto" }}>
                                                <Link
                                                  className="ms-3"
                                                  to={`/qakReply/edit/${QakReplies.qakReply_id}`}
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
                                                  onClick={handleDeleteQakReply.bind(
                                                    this,
                                                    QakReplies.qakReply_id,
                                                    QakReplies.User.user_id
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
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p>No replies available for this QAK.</p>
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
  );
};

export default Qak;
