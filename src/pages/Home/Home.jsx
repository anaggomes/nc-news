import { useContext, useEffect, useState } from "react";
import LogIn from "./LogIn";
import { UserContext } from "../../contexts/User";
import { getPopularArticles } from "../../apis/apis";
import { ArticleTiles } from "../../components/ArticleTile";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorPage from "../ErrorPage";

export default function Home() {
  const { userLogIn } = useContext(UserContext);
  const [articlesSelect, setArticlesSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    setError(null);
    getPopularArticles()
      .then(({ articles }) => {
        const articlesDateFormatted = articles.map((article) => {
          return { ...article, created_at: article.created_at.split("T")[0] };
        });
        setArticlesSelect(articlesDateFormatted);
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
        <section className="page-components">
          <h2>Hi {userLogIn.username} !</h2>

          <section id="home-topics" className="home-selection">
            <Link to="/topics">
              <h3 className="link-see-all">See all topics</h3>
            </Link>
            <p>See the articles for today's hottest topics:</p>
            <Link to="/articles?topic=coding">
              <span>Coding</span>
            </Link>
            <Link to="/articles?topic=football">
              <span>Football</span>
            </Link>
          </section>

          <section id="home-articles" className="home-selection">
            <Link to="/articles">
              <h3 className="link-see-all">See all articles</h3>
            </Link>
            <p>A selection of our most popular articles:</p>
            <ul>
              {articlesSelect.map((article) => {
                return (
                  <Link
                    to={`/article/${article.article_id}`}
                    key={article.article_id}
                  >
                    <ArticleTiles article={article} />
                  </Link>
                );
              })}
            </ul>
          </section>
        </section>
      )}
    </>
  );
}
