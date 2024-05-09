import Lottie from "lottie-react";
import walkingOrange from "../assets/walkingOrange.json";

export default function LoadingComponent() {
  return (
    <>
      <div className="loading-animation-container">
        <Lottie
          animationData={walkingOrange}
          loop={true}
          className="animation"
        />
      </div>
      <h2 className="loading-title">Loading...</h2>
    </>
  );
}
