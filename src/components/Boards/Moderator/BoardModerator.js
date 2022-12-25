import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import EventBus from "../../../common/EventBus";

import AuthService from "../../../services/auth.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   UserService.getModeratorBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);

  //       if (error.response && error.response.status === 401) {
  //         window.location.pathname = '/home'
  //         EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }, []);

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
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
  };

  return (
    <div className="box-event">
      <div class="margin5">
        <h2><b>Панель модератора</b></h2>
        <hr align="center" width="100%" size="2" color="red" />
      </div>
      <div>
        {showModeratorBoard && 
          <Link to={"/register"}><button type="button" class="btn btn-secondary">Регистрация Пользователей</button></Link>
        }
        <Link to={"/mod/users-table"}><button type="button" class="btn btn-secondary">Таблица пользователей</button></Link>
      </div>

    </div>
  );
};

export default BoardModerator;
