import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import { Visibility } from "@mui/icons-material";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Заполните все поля!
      </div>
    );
  }
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/foodkeeper");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12 margin5">
      <div className="card card-container">
        <div margin5>
          <h2 align="center">Войти</h2>
          <hr align="center" width="100%" size="2" color="red" />
        </div>
        <img src={require('./../../logo.png')} width="100%" height="100%"></img>
        <Form onSubmit={handleLogin} ref={form}>
          <hr align="center" width="100%" size="2" color="red" />
          <div className="form-group">
            <label htmlFor="username"><b>Логин</b></label>
            <Input
              placeholder="Логин"
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Пароль</b></label>
            <Input
              placeholder="********"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Войти</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
