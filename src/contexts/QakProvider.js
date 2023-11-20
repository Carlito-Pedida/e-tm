import axios from "axios";
import { useEffect, useState } from "react";
import QakContext from "./QakContext";

export const QakProvider = (props) => {
  const [qak, setQak] = useState([]);
  const baseUrl = "http://localhost:3000/api/qaks/";

  useEffect(() => {
    async function fetchData() {
      await getAllQaks();
    }
    fetchData();
  }, []);

  function getAllQaks() {
    return axios.get(baseUrl).then((response) => setQak(response.data));
  }

  function getAllUserQaks() {
    return axios.get(baseUrl).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getUserQaks(user_id) {
    const url = "http://localhost:3000/api/qaks/user/";
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios.get(url + user_id, { headers }).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function createQak(qak) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };

    return axios.post(baseUrl, qak, { headers: myHeaders }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getOneQak(qak_id) {
    return axios.get(baseUrl + qak_id).then((response) => {
      getAllQaks();
      console.log(response.data);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function editQak(qak, user_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios
      .put(baseUrl + qak.qak_id, { ...qak, user_id }, { headers })
      .then((response) => {
        getAllQaks();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function deleteQak(qak_id) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    };
    return axios.delete(baseUrl + qak_id, { headers }).then((response) => {
      getAllQaks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <QakContext.Provider
      value={{
        qak,
        getOneQak,
        getUserQaks,
        createQak,
        editQak,
        deleteQak,
        getAllQaks,
        getAllUserQaks
      }}
    >
      {props.children}
    </QakContext.Provider>
  );
};
