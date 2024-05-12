import Lottie from "lottie-react";
import walkingOrange from "../assets/walkingOrange.json";

export default function LoadingComponent() {
  return (
    <section className="error-loading-component">
      <div className="animation-container">
        <Lottie
          animationData={walkingOrange}
          loop={true}
          className="animation"
        />
      </div>
      <div className="error-loading-message">
        <h2>Loading...</h2>
      </div>
    </section>
  );
}
