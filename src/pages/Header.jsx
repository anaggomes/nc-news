import { Link } from "react-router-dom";

import menu from "../assets/menu.svg";

import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  function handleResize() {
    setIsMenuOpen(window.innerWidth > 650);
  }
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLinkClick() {
    if (window.innerWidth < 650) toggleMenu();
  }
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <section id="header">
      <h1 id="app-title">NC NEWS</h1>
      <nav className="navBar">
        <ul style={{ display: isMenuOpen ? "inline" : "none" }}>
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
        <img id="menu-icon" src={menu} alt="menu icon" onClick={toggleMenu} />
      </nav>
    </section>
  );
}
