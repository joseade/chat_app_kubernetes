import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import { useTranslation } from "react-i18next";

import * as actionsUser from "../actions/user";

const Profile = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [userPicture, setUserPicture] = useState("");
  const profilePicture = useRef();
  const avatars = ["avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"];
  const [language, setLanguage] = useState(false);
  const [newAvatar, setNewAvatar] = useState(false);

  const onUpdateImage = () => {
    const newPicture = profilePicture.current.src.replace(
      window.location.origin,
      ""
    );
    setUserPicture(newPicture);
    dispatch(actionsUser.updateAvatar({ profilePicture: newPicture }));

    // const res = await axios.post("/users/picture", {
    //   profilePicture: profilePicture.current.src.replace(
    //     "http://localhost:3000",
    //     ""
    //   ),
    // });

    setNewAvatar(false);
  };

  const onLanguageChange = ({ target }) => {
    dispatch(actionsUser.updateLanguage({ language: target.value }));
    //dispatch({ type: "CHANGE_LANGUAGE", payload: target.value });

    i18n.changeLanguage(target.value);
    setLanguage(false);
  };

  if (!user.signin) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
      <div className="card mb-3 w-75">
        <div className="row g-0 ">
          <div className="col-md-5">
            <img
              src={user.profilePicture}
              className="img-fluid rounded-start"
              alt="..."
              ref={profilePicture}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{t("profile.title")}</h5>
              <p className="card-text">
                {`${t("profile.name")}: ${user.name}`}
              </p>
              <p className="card-text">{`${t("profile.email")}: ${
                user.email
              }`}</p>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary me-3"
                  onClick={() => {
                    setLanguage(true);
                    setNewAvatar(false);
                  }}
                >
                  {t("profile.language")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setLanguage(false);
                    setNewAvatar(true);
                  }}
                >
                  {t("profile.image")}
                </button>
              </div>
              {language && (
                <div className="mt-5 d-flex justify-content-evenly align-items-center">
                  <button
                    value="en"
                    onClick={onLanguageChange}
                    type="button"
                    className="btn btn-dark"
                  >
                    English
                  </button>
                  <button
                    value="fr"
                    onClick={onLanguageChange}
                    type="button"
                    className="btn btn-dark"
                  >
                    Francais
                  </button>
                  <button
                    value="es"
                    onClick={onLanguageChange}
                    type="button"
                    className="btn btn-dark"
                  >
                    Espanol
                  </button>
                </div>
              )}
              {newAvatar && (
                <div className="d-flex justify-content-center mt-3">
                  <div
                    id="carouselExampleControls"
                    className="carousel slide w-50 "
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src="/person/avatar1.png"
                          className="d-block w-100"
                          alt="..."
                          onClick={(e) =>
                            (profilePicture.current.src = e.target.src)
                          }
                        />
                      </div>
                      {avatars.map((avatar) => {
                        return (
                          <div className="carousel-item ">
                            <img
                              src={`/person/${avatar}`}
                              className="d-block w-100"
                              alt="..."
                              onClick={(e) =>
                                (profilePicture.current.src = e.target.src)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary me-3 mt-3"
                        onClick={() => onUpdateImage()}
                      >
                        {t("profile.save")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => setNewAvatar(false)}
                      >
                        {t("profile.cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end w-75">
        <Link to="/dashboard">
          <i className="fs-5 bi bi-arrow-return-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
