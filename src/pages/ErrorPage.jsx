import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import sadAnimation from "../assets/sadAnimation.json";
export default function ErrorPage(props) {
  const { message, status } = props;

  return (
    <section id="error-component">
      <Lottie
        animationData={sadAnimation}
        loop={true}
        className="animation-error"
      />
      <h2>{status}</h2>
      <h3>
        {message || "Sorry, the page you are trying to access does not exist."}
      </h3>
      <Link to="/articles">
        <button>Return to all articles</button>
      </Link>
    </section>
  );
}
