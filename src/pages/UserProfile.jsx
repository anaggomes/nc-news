import { useContext } from "react";
import { UserContext } from "../contexts/User";

import { Link } from "react-router-dom";

export default function UserProfile() {
  const { userLogIn, setUserLogIn } = useContext(UserContext);
  return (
    <section className="page-components" id="profile-page">
      <h2 className="page-title">Your account:</h2>
      <section id="profile-container">
        <img
          id="profile-avatar"
          src={userLogIn.avatar_url}
          alt="user avatar image"
        />
        <h3>
          <strong>Name: </strong>
          {userLogIn.name}
        </h3>
        <h3>
          <strong>Username: </strong>
          {userLogIn.username}
        </h3>
      </section>
      <Link to="/">
        <button
          id="logout-button"
          onClick={() => {
            setUserLogIn({});
          }}
        >
          Log Out
        </button>
      </Link>
    </section>
  );
}
