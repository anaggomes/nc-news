import { useContext } from "react";
import { UserContext } from "../contexts/User";

import { Link } from "react-router-dom";

export default function UserProfile() {
  const { userLogIn, setUserLogIn } = useContext(UserContext);
  return (
    <section className="page-components" id="profile-page">
      <img
        id="profile-avatar"
        src={userLogIn.avatar_url}
        alt="user avatar image"
      />
      <h3>{userLogIn.name}</h3>
      <h3>{userLogIn.username}</h3>
      <Link to="/">
        <span
          onClick={() => {
            setUserLogIn({});
          }}
        >
          Log Out
        </span>
      </Link>
    </section>
  );
}
