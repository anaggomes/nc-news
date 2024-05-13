import { useContext, useState } from "react";
import { getUserByUsername } from "../../apis/apis";
import { UserContext } from "../../contexts/User";

export default function LogIn() {
  const [logInInput, setLogInInput] = useState({});
  const [logInError, setLogInError] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const { setUserLogIn } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (!logInInput.password || !logInInput.username) {
      setLogInError({ submit: "please provide username and password" });
    } else {
      setIsSubmitClicked(true);
      getUserByUsername(logInInput.username)
        .then(({ user }) => {
          setUserLogIn(user);
        })
        .catch((err) => {
          setIsSubmitClicked(false);
          setLogInError({ username: "username not found" });
        });
    }
  }
  function handleBlur(input) {
    if (input === "username" && !logInInput.username)
      setLogInError({ username: "this field can not be empty" });
    if (input === "password" && !logInInput.password)
      setLogInError({ password: "this field can not be empty" });
  }

  return (
    <section id="login-component">
      <div id="login-container">
        <h1 id="login-title">NC NEWS</h1>
        <h4 id="login-intro">
          Sign in to gain access to all articles and join the conversation with
          other users. Your thoughts and insights matter – let's make this
          community thrive together!
        </h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={logInInput.username}
            onChange={(e) => {
              setLogInError({ ...logInError, username: "" });
              setLogInInput({ ...logInInput, username: e.target.value });
            }}
            disabled={isSubmitClicked}
            onBlur={() => {
              handleBlur("username");
            }}
          />
          {logInError.username && (
            <span className="error-message">{logInError.username}</span>
          )}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            disabled={isSubmitClicked}
            onBlur={() => {
              handleBlur("password");
            }}
            onChange={(e) => {
              setLogInError({ ...logInError, password: "" });
              setLogInInput({ ...logInInput, password: e.target.value });
            }}
          />
          {logInError.password && (
            <span className="error-message">{logInError.password}</span>
          )}
          <button id="login-button" type="submit" disabled={isSubmitClicked}>
            login
          </button>
          {logInError.submit && (
            <span className="error-message">{logInError.submit}</span>
          )}
        </form>
        <p className="user-login">username: cooljmessy </p>
        <p className="user-login">password: any :) </p>
      </div>
    </section>
  );
}
