import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as actions from "../../actions/user";

const Navbar = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { friends, followers } = user;
  const possibleFriends = followers.filter(
    (follower) => !friends.some((friend) => friend.id === follower.id)
  );

  const friendshipRequest = (possibleFriend) => {
    const { id, name, email, profilePicture } = user;
    dispatch(
      actions.sendFollower(
        { id, name, email, profilePicture },
        { id: possibleFriend.id }
      )
    );
    dispatch(actions.followUserRequest(possibleFriend, { userId: user.id }));
  };

  return (
    <nav className="vh-10 navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">Chat Application</div>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-fill"></i>
              {`${possibleFriends.length}`}
            </div>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <div className="dropdown-item">
                  {possibleFriends.length > 0 &&
                    possibleFriends.map((possibleFriend) => (
                      <div className="mb-3" key={possibleFriend.id}>
                        <div>
                          {`${t("navbar.friendship")} ${possibleFriend.name} ?`}
                        </div>
                        <button
                          onClick={() => friendshipRequest(possibleFriend)}
                          className="col-6 btn btn-success"
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                        <button className="col-6 btn btn-danger">
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    ))}
                </div>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">{`${t("navbar.welcome")} ${
              user.name
            }`}</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              {t("navbar.logout")}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
