import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function SignOut() {
  const [LoggeUser, setLoggedUser] = useState();

  console.log(LoggeUser);
  useEffect(() => {
    try {
      const jwt = localStorage.removeItem("userToken");
      const userToken = jwtDecode(jwt);
      setLoggedUser(userToken).then(() => {});
    } catch (ex) {}
    window.location = "/";
  }, []);
}

export default SignOut;
