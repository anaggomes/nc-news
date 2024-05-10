import { useContext, useEffect, useState } from "react";
import { getArticleByID } from "../../apis/apis";
import { Link, useLocation, useParams } from "react-router-dom";
import DisplayArticle from "./DisplayArticle.jsx";
import ArticleComments from "./ArticleComments.jsx";
import ErrorPage from "../../components/ErrorPage.jsx";
import LoadingComponent from "../../components/LoadingComponent.jsx";
import { TotalArticlesContext } from "../../contexts/TotalArticles.jsx";

export default function IndividualArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const { article_id } = useParams();
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { totalArticles } = useContext(TotalArticlesContext);

  useEffect(() => {
    setError(null);
    getArticleByID(article_id)
      .then(({ article }) => {
        const articleDateFormatted = {
          ...article,
          created_at: article.created_at.split("T")[0],
        };
        setSingleArticle(articleDateFormatted);
        setIsArticleLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id]);

  if (error)
    return (
      <ErrorPage
        message={error.err.response.data.message}
        status={error.err.response.status}
      />
    );

  return (
    <section className="page-components" id="individual-article">
      {isArticleLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <section id="ind-article-buttons">
            <Link to={`/articles/${+article_id - 1}`}>
              <button id="previous-button" disabled={article_id === 1}>
                {"<"} Previous article
              </button>
            </Link>{" "}
            |
            <Link to={`/articles/${+article_id + 1}`}>
              <button id="next-button" disabled={article_id === totalArticles}>
                Next article {">"}
              </button>
            </Link>
          </section>
          <DisplayArticle article={singleArticle} />
          <ArticleComments
            article_id={article_id}
            setIsCommentsLoading={setIsCommentsLoading}
            isCommentsLoading={isCommentsLoading}
            comment_count={singleArticle.comment_count}
          />
        </>
      )}
    </section>
  );
}
