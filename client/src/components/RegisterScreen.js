import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as actions from "../actions/user";

const RegisterScreen = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formValues = ({ target }) => {
    const { name, value } = target;
    setNewUser((user) => {
      return { ...user, [name]: value };
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(actions.registerRequest(newUser));
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

  if (user.signup) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="container col-4">
        <form onSubmit={register}>
          <h1 className="h3 mb-3 fw-normal text-center">
            {t("register.welcome")}
          </h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="name"
              value={newUser.name}
              required
              onChange={formValues}
            />
            <label htmlFor="floatingInput">{t("register.name")}</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={newUser.email}
              required
              onChange={formValues}
            />
            <label htmlFor="floatingInput">{t("register.email")}</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={newUser.password}
              required
              onChange={formValues}
            />
            <label htmlFor="floatingPassword">{t("register.password")}</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {t("register.signup")}
          </button>

          <div className="d-flex justify-content-end">
            <Link className="link-dark mt-1" to="/login">
              Log in
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
                  {error.message === "Email in use" && (
                    <>{t("register.error.email")}</>
                  )}
                  {error.message ===
                    "Password must be between four and twenty characters" && (
                    <>{t("register.error.password")}</>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
