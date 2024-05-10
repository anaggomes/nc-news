import { useContext } from "react";
import { UserContext } from "../contexts/User";
import search from "../assets/search.svg";
import post from "../assets/post.svg";
import { Link } from "react-router-dom";
import profile from "../assets/profile.svg";
export default function Footer() {
  const { userLogIn } = useContext(UserContext);
  return (
    <section id="footer">
      <img src={search} /> <img src={post} />
      <Link to="/userprofile">
        <div id="footer-avatar">
          <img
            src={userLogIn.avatar_url ? userLogIn.avatar_url : profile}
            alt="user avatar image"
          />
        </div>
      </Link>
    </section>
  );
}
