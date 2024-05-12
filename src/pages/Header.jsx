import { Link } from "react-router-dom";

import menu from "../assets/menu.svg";

import { useEffect, useState } from "react";
import NavButtons from "../components/NavButtons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavButtonHeader, setIsNavButtonHeader] = useState(false);
  function handleResize() {
    setIsNavButtonHeader(window.innerWidth > 750);
  }
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLinkClick() {
    toggleMenu();
  }
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <section id="header">
      <h1 id="app-title">NC NEWS</h1>
      <nav className="navBar">
        <ul id="drop-menu" style={{ display: isMenuOpen ? "inline" : "none" }}>
          <Link to="/" onClick={handleLinkClick}>
            <li>Home</li>
          </Link>
          <Link to="/articles" onClick={handleLinkClick}>
            <li>All articles</li>
          </Link>
          <Link to="/topics" onClick={handleLinkClick}>
            <li>All Topics</li>
          </Link>
          <Link to="/users" onClick={handleLinkClick}>
            <li>All Users</li>
          </Link>
        </ul>
        <ul className="header-buttons">
          {isNavButtonHeader && <NavButtons />}
          <li>
            <img
              id="menu-icon"
              src={menu}
              alt="menu icon"
              onClick={toggleMenu}
            />
          </li>
        </ul>
      </nav>
    </section>
  );
}
