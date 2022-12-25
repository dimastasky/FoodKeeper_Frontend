import React, { useState, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vfullname = (value) => {
  if (value.length < 3 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The Full name must be between 3 and 50 characters.
      </div>
    )
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {


  const [username, setUsername] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const [fullname, setFullname] = useState("");
  const onChangeFullname = (e) => {
    const fullname = e.target.value;
    setFullname(fullname);
  };

  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, fullname, password, ["user"]).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div margin5>
          <h2 align="center">Регистрация</h2>
          <hr align="center" width="100%" size="2" color="red" />
        </div>
        <img src={require('./../../logo.png')} width="100%" height="100%"></img>
        <Form onSubmit={handleRegister} ref={form}>
          <hr align="center" width="100%" size="2" color="red" />
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username"><b>Логин</b></label>
                <Input
                  type="text"
                  placeholder="Логин"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <Input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fullname"><b>Фамилия Имя Отчество</b></label>
                <Input
                  type="text"
                  placeholder="ФИО"
                  className="form-control"
                  name="fullname"
                  value={fullname}
                  onChange={onChangeFullname}
                  validations={[required, vfullname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"><b>Пароль</b></label>
                <Input
                  type="password"
                  placeholder="********"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Зарегистрировать</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <Link to={"/login"}><button type="button" class="btn btn-secondary"><b>Войти</b></button></Link>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
