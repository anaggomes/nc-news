import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import sadAnimation from "../assets/sadAnimation.json";

export default function ErrorPage(props) {
  const { message, status } = props;

  return (
    <section className="error-loading-component">
      <div className="animation-container">
        <Lottie
          animationData={sadAnimation}
          loop={true}
          className="animation"
        />
      </div>
      <div className="error-loading-message">
        <h2>{status}</h2>
        <h3>
          {message ||
            "Sorry, the page you are trying to access does not exist."}
        </h3>
        <Link to="/">
          <button type="submit">Return to home </button>
        </Link>
      </div>
    </section>
  );
}
