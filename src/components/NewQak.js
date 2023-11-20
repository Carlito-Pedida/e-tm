import React, { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import "../styles/SignIn.css";
import { useNavigate, useParams } from "react-router-dom";
import QakContext from "../contexts/QakContext";

const NewQak = ({ show, handleClose }) => {
  let params = useParams();
  let navigate = useNavigate();

  let [newQak, setNewQak] = useState({
    qak_id: params.qak_id,
    qak: "",
  });

  let { createQak } = useContext(QakContext);

  let { qak_id, qak } = newQak;

  function create() {
    if (qak_id === undefined) {
      return createQak(newQak);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    create(newQak)
      .then(() => {
        if (!newQak.ok) {
          alert("Your QAK is posted");
        }
        handleClose();
        navigate(window.location.reload());
      })
      .catch((error) => {
        console.error(error);
        alert("You need to be Signed In to perform this operation");
        navigate("/qaks");
      });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <div className="form-wrap">
          <div className="form-case">
            <div className="close-button"></div>
            <Modal.Body>
              <p className="register">
                Not a member?{" "}
                <a className="register-link" href="/signup">
                  Register
                </a>{" "}
                It's free!
              </p>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center mx-3 mb-0">
                  Any Questions or Thoughts?
                </p>
              </div>

              <Form onSubmit={handleSubmit} key={qak_id}>
                <Form.Group className="mb-3">
                  <Form.Control
                    as={"textarea"}
                    type="text"
                    rows={6}
                    cols={65}
                    name="qak"
                    value={qak}
                    onChange={(e) =>
                      setNewQak({ ...newQak, qak: e.target.value })
                    }
                  />
                </Form.Group>

                <Button
                  className="mb-3 w-100"
                  variant="primary "
                  size="sm"
                  type="submit"
                  onClick={handleClose}
                >
                  Submit
                </Button>
              </Form>
              <Button
                className="w-100"
                variant="secondary"
                size="sm"
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewQak;
