import { useEffect, useState } from "react";
import { getAllTopics } from "../apis/apis";
import { Link } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import LoadingComponent from "../components/LoadingComponent";

export default function AllTopics() {
  const [allTopics, setAllTopics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllTopics()
      .then(({ topics }) => {
        setAllTopics(topics);
        setIsLoading(false);
      })

      .catch((err) => {
        setError({ err });
      });
  }, []);
  if (error)
    return (
      <ErrorPage
        message={error.err.response.data.message}
        status={error.err.response.status}
      />
    );
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <section className="page-components" id="topics-page">
          <h2 className="page-title">Find articles about each topic:</h2>
          <ul>
            {allTopics.map((topic) => {
              return (
                <Link to={`/articles?topic=${topic.slug}`} key={topic.slug}>
                  <li className="topics tiles">
                    <h3>{topic.slug}</h3>
                    <p>{topic.description}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
