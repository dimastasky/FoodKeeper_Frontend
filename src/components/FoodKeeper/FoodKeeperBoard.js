import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";

const FoodKeeperBoard = () => {
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
        <h2><b>FoodKeeper</b></h2>
        <hr align="center" width="100%" size="2" color="red" />
      </div>
      <div>
        <Link to={"foodkeeper/products"}><button type="button" class="btn btn-secondary">All Products Table</button></Link>
        <Link to={"foodkeeper/"}></Link>
        <Link to={"foodkeeper/user-warehouses"}><button type="button" class="btn btn-secondary">User Warehouses Table</button></Link>
      </div>
    </div>
  )
}

export default FoodKeeperBoard;