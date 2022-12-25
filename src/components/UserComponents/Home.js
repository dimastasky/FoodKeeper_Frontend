import React, { useState, useEffect } from "react";

// import UserService from "../../services/user.service";
import { Switch, Route, Link } from "react-router-dom";

import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="box-event">
      <div class="margin5">
        <h2><b>FoodKeeper</b></h2>
        <hr align="center" width="100%" size="2" color="red" />
      </div>
      <div>
        {currentUser && (
          <Link to={"/foodkeeper"}><button type="button" class="btn btn-secondary"><b>FoodKeeper</b></button></Link>
        )}
        {showModeratorBoard && (
          <Link to={"/mod"}><button type="button" class="btn btn-secondary"><b>Панель модератора</b></button></Link>
        )}
        {!currentUser && (
          <Link to={"/login"}><button type="button" class="btn btn-secondary"><b>Войти</b></button></Link>
        )}
        {!currentUser && (
          <Link to={"/signup"}><button type="button" class="btn btn-secondary"><b>Регистрация</b></button></Link>
        )}

      </div>

    </div>

  );
};

export default Home;