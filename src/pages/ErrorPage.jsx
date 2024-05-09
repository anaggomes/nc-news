import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import sadAnimation from "../assets/sadAnimation.json";

export default function ErrorPage(props) {
  const { message, status } = props;

  return (
    <section id="error-component">
      <div id="animation-error-container">
        <Lottie
          animationData={sadAnimation}
          loop={true}
          className="animation"
        />
      </div>
      <h2>{status}</h2>
      <h3>
        {message || "Sorry, the page you are trying to access does not exist."}
      </h3>
      <Link to="/articles">
        <button type="submit">Return to all articles</button>
      </Link>
    </section>
  );
}
