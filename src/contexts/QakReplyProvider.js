import { useContext, useState } from "react";
import QakContext from "./QakContext";
import QakReplyContext from "./QakReplyContext";
import axios from "axios";

export const QakReplyProvider = (props) => {
  const [qakReply, setQakReply] = useState([]);
  const baseUrl = "http://localhost:3000/api/qakReply/";

  let { getAllQaks, qak } = useContext(QakContext);

  function createQakReply(qakReply) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios
      .post(baseUrl, qakReply, { headers: myHeaders })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function getOneQakReply(qakReply_id) {
    return axios.get(baseUrl + qakReply_id).then((response) => {
      getAllQaks();
      console.log(response.data);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function updateQakReply(qakReply, qakReply_id, qak_id, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios
      .put(
        baseUrl + qakReply.qakReply_id,
        { ...qakReply, qakReply_id, qak_id, user_id },
        { headers }
      )
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteQakReply(qakReply_id, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios.delete(baseUrl + qakReply_id, { headers }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <QakReplyContext.Provider
      value={{
        createQakReply,
        getOneQakReply,
        updateQakReply,
        deleteQakReply
      }}
    >
      {props.children}
    </QakReplyContext.Provider>
  );
};
