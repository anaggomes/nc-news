import { useEffect, useState } from "react";
import { getAllUsers } from "../apis/apis";
import ErrorPage from "../components/ErrorPage";
import LoadingComponent from "../components/LoadingComponent";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getAllUsers()
      .then(({ users }) => {
        setAllUsers(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error)
    return (
      <ErrorPage
        message={error.response.data.message}
        status={error.response.status}
      />
    );
  if (isLoading) return <LoadingComponent />;
  return (
    <section className="page-components" id="users-section">
      <h2>Our community of writers and readers :)</h2>
      <h3>Click to see their articles!</h3>
      <ul>
        {allUsers.map((user) => {
          return (
            <Link to={`/articles?author=${user.username}`} key={user.username}>
              <li className="users-tile">
                <img src={user.avatar_url} />
                <h4>{user.username}</h4>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
