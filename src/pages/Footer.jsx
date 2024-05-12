import { useEffect, useState } from "react";
import NavButtons from "../components/NavButtons";

export default function Footer() {
  const [isNavShowing, setIsNavShowing] = useState(false);

  function handleResize() {
    setIsNavShowing(window.innerWidth < 750);
  }
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="footer">
      <ul className="footer-buttons">{isNavShowing && <NavButtons />}</ul>
    </section>
  );
}
