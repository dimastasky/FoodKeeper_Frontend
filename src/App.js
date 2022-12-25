import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css.map";

import "./styles/App.css";
import "./styles/Table.css"
import "./styles/Create.css"
import "./styles/media.css"

import AuthService from "./services/auth.service";

import Login from "./components/UserComponents/Login";
import Register from "./components/UserComponents/Register";
import Home from "./components/UserComponents/Home";
import Profile from "./components/UserComponents/Profile";

import BoardUser from "./components/Boards/BoardUser";
import BoardModerator from "./components/Boards/Moderator/BoardModerator";
import BoardAdmin from "./components/Boards/BoardAdmin";

import FoodKeeperBoard from "./components/FoodKeeper/FoodKeeperBoard";
import ProductsTable from "./components/FoodKeeper/Products/ProductsTable";
import UserWarehousesTable from "./components/FoodKeeper/Warehouses/UserWarehousesTable";

import RecordsTable from "./components/FoodKeeper/Records/FoodRecordsTable";
import RecordsTable2 from "./components/FoodKeeper/Records/RecordsTable2";


// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="container-xxl">
      <nav className="navbar navbar-expand-xl navbar-primary bg-darkblue">
        <Link to={"/"} className="navbar-brand">
          <img src={require('./logo.png')} width={125} height={75}></img>
        </Link>
        <div className="navbar-nav mr-auto">

          {currentUser && (
            <li className="nav-item">
              <Link to={"/foodkeeper"} className="nav-link">
                FoodKeeper
              </Link>
            </li>
          )}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Панель модератора
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Панель администратора
              </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )} */}

          {/* {showModeratorBoard && (<li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Регистрация
            </Link>
          </li>)} */}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Профиль: {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Выход
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Вход
              </Link>
            </li>

            {showModeratorBoard && (<li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Регистрация
              </Link>
            </li>)}
          </div>
        )}
      </nav>

      <div className="">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/profile" component={Profile} />

          
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={BoardAdmin} />
          <Route exact path="/mod" component={BoardModerator} />

          <Route exact path="/foodkeeper" component={FoodKeeperBoard} />
          <Route path="/foodkeeper/products" component={ProductsTable}/>
          <Route exact path="/foodkeeper/user-warehouses" component={UserWarehousesTable}/>
          
          <Route path="/foodkeeper/user-warehouses/id/:id" component={RecordsTable}/>
          <Route path="/foodkeeper/user-warehouses2/id/:id" component={RecordsTable2}/>
        </Switch>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
