import search from "../assets/search.svg";
import post from "../assets/post.svg";
import { Link } from "react-router-dom";
import profile from "../assets/profile.svg";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function NavButtons() {
  const { userLogIn } = useContext(UserContext);
  return (
    <>
      <li>
        <img src={search} />{" "}
      </li>
      <li>
        <img src={post} />
      </li>
      <li id="avatar-button">
        <Link to="/userprofile">
          <img
            src={userLogIn.avatar_url ? userLogIn.avatar_url : profile}
            alt="user avatar image"
          />
        </Link>
      </li>
    </>
  );
}
