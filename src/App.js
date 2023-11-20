import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import RssFeed from "./components/RssFeed";
import Search from "./components/Search";
import Qak from "./components/Qak";
import NewQak from "./components/NewQak";
import EditQak from "./components/EditQak";
import EditUserQak from "./components/EditUserQak";
import NoProfile from "./components/NoProfile";
import EditProfile from "./components/EditProfile";
import NewQakReply from "./components/NewQakReply";
import EditQakReply from "./components/EditQakReply";
import { UserProvider } from "./contexts/UserProvider";
import { SearchProvider } from "./contexts/SearchContext";
import { QakProvider } from "./contexts/QakProvider";
import { QakReplyProvider } from "./contexts/QakReplyProvider";
import jwtDecode from "jwt-decode";
import "./styles/App.css";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("userToken");
      const userToken = jwtDecode(jwt);
      setUser(userToken);
    } catch (ex) {}
  }, []);

  return (
    <div className="wrap backgroundColor">
      <QakProvider>
        <QakReplyProvider>
          <SearchProvider>
            <UserProvider>
              <BrowserRouter>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} index />
                  <Route path="/search" element={<Search />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="/rssfeed" element={<RssFeed />} />
                  <Route user={user} path="/qaks" element={<Qak />} />
                  <Route path="/qaks/new" element={<NewQak />} />
                  <Route path="/qaks/:qak_id/edit" element={<EditQak />} />
                  <Route
                    path="/userqak/:qak_id/edit"
                    element={<EditUserQak />}
                  />
                  <Route
                    path="/qakReply/edit/:qakReply_id"
                    element={<EditQakReply />}
                  />
                  <Route
                    path="/qakReply/new/:qak_id"
                    element={<NewQakReply />}
                  />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/profile/:id/edit" element={<EditProfile />} />
                  <Route path="/noprofile/:user_id" element={<NoProfile />} />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </SearchProvider>
        </QakReplyProvider>
      </QakProvider>
    </div>
  );
}

export default App;
