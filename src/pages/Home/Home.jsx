import { useContext, useEffect, useState } from "react";
import LogIn from "./LogIn";
import { UserContext } from "../../contexts/User";
import { getPopularArticles } from "../../apis/apis";
import { ArticleTiles } from "../../components/ArticleTile";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorPage from "../../components/ErrorPage";
import { TotalArticlesContext } from "../../contexts/TotalArticles";

export default function Home() {
  const { userLogIn } = useContext(UserContext);
  const [articlesSelect, setArticlesSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const { setTotalArticles } = useContext(TotalArticlesContext);

  useEffect(() => {
    setError(null);
    getPopularArticles()
      .then(({ articles, total_count }) => {
        const articlesDateFormatted = articles.map((article) => {
          return { ...article, created_at: article.created_at.split("T")[0] };
        });
        setArticlesSelect(articlesDateFormatted);
        setTotalArticles(total_count);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  if (isLoading) return <LoadingComponent />;

  if (error)
    return (
      <ErrorPage
        message={error.err.response.data.message}
        status={error.err.response.status}
      />
    );
  return (
    <>
      {!userLogIn.username ? (
        <LogIn />
      ) : (
        <section id="home-component">
          <div id="home-welcome">
            <h2>Hi {userLogIn.username} !</h2>
            <h3>What would you like to read today?</h3>
          </div>
          <section id="home-topics" className="home-selection">
            <h3>Click to read today's hottest topics:</h3>
            <ul>
              <Link to={`/articles?topic=coding`}>
                <li className="topics tiles">
                  <h3>coding</h3>
                  <p>Code is love, code is life</p>
                </li>
              </Link>
              <Link to={`/articles?topic=football`}>
                <li className="topics tiles" id="home-second-topic">
                  <h3>Football</h3>
                  <p>Footie</p>
                </li>
              </Link>
            </ul>

            <Link to="/topics">
              <button className="link-see-all">See all topics</button>
            </Link>
          </section>

          <section id="home-articles" className="home-selection">
            <h3>Popular articles:</h3>
            <ul>
              {articlesSelect.map((article) => {
                return (
                  <Link
                    to={`/articles/${article.article_id}`}
                    key={article.article_id}
                  >
                    <ArticleTiles article={article} />
                  </Link>
                );
              })}
            </ul>
            <Link to="/articles">
              <button className="link-see-all">See all articles</button>
            </Link>
          </section>
        </section>
      )}
    </>
  );
}
