import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import * as actions from "../actions/user";
import * as actionsSocket from "../actions/socket";

const LogInScreen = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [registeredUser, setRegisteredUser] = useState({
    email: "",
    password: "",
  });

  const formValues = ({ target }) => {
    const { name, value } = target;
    setRegisteredUser((registeredUser) => {
      return { ...registeredUser, [name]: value };
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(actions.loginRequest(registeredUser));
  };

  useEffect(() => {
    if (!user.language) {
      if (/^en\b/.test(navigator.language)) {
        i18n.changeLanguage("en");
        dispatch({ type: "CHANGE_LANGUAGE", payload: "en" });
      }
      if (/^es\b/.test(navigator.language)) {
        i18n.changeLanguage("es");
        dispatch({ type: "CHANGE_LANGUAGE", payload: "es" });
      }
      if (/^fr\b/.test(navigator.language)) {
        i18n.changeLanguage("fr");
        dispatch({ type: "CHANGE_LANGUAGE", payload: "fr" });
      }
    }
  }, [user.language]);

  if (user.signin) {
    //console.log(actionsSocket.startSocket(user));
    dispatch(actionsSocket.startSocket(user));
    // dispatch({
    //   type: actions.Types.START_SOCKET,
    //   payload: {
    //     type: "ADD_USER",
    //     userId: user.id,
    //   },
    // });
    return <Redirect to={"/dashboard"} />;
  }

  //   useEffect(() => {
  //     if (registeredUserSignIn.succes) {
  //       props.history.push("/dash");
  //     }
  //   }, [registeredUserSignIn.succes]);

  const location = {
    pathname: "/register",
    state: { fromLogin: true },
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="container col-4">
        <form onSubmit={register}>
          <h1 className="h3 mb-3 fw-normal text-center">
            {t("login.welcome")}
          </h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={registeredUser.email}
              required
              onChange={formValues}
            />
            <label htmlFor="floatingInput">{t("login.email")}</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={registeredUser.password}
              required
              onChange={formValues}
            />
            <label htmlFor="floatingPassword">{t("login.password")}</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {t("login.signin")}
          </button>
          <div className="d-flex justify-content-end">
            <Link
              onClick={() => {
                dispatch({ type: "BACK_TO_REGISTER" });
              }}
              className="link-dark mt-1"
              to={location}
            >
              Register
            </Link>
          </div>
        </form>

        <div className="mt-2">
          <ul className="list-group">
            {user.errors.length > 0 &&
              user.errors.map((error) => (
                <li
                  key={error.message}
                  className="list-group-item list-group-item-warning"
                >
                  {t("login.error")}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;
