import { Link } from "react-router-dom";
import AllArticles from "./AllArticles/AllArticles";
import home from "../assets/home.svg";
import Home from "./Home/Home";

export default function Header() {
  return (
    <section id="header">
      <h1 id="app-title">NC NEWS</h1>
      <nav className="navBar">
        <ul>
          {/* <Link to="/"> */}
          {/* <li>Home</li> */}
          {/* </Link> */}
          <Link to="/">
            <img src={home} />
          </Link>
          {/* <Link to="/topics">
            <li>All Topics</li>
          </Link> */}
          {/* <Link to="/users"> */}
          {/* <li>All Users</li> */}
          {/* </Link> */}
        </ul>
      </nav>
    </section>
  );
}
