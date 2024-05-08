import { useEffect, useState } from "react";
import { getArticleByID } from "../../apis/apis";
import { useParams } from "react-router-dom";
import DisplayArticle from "./DisplayArticle.jsx";
import ArticleComments from "./ArticleComments.jsx";
import ErrorPage from "../ErrorPage.jsx";

export default function IndividualArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const { article_id } = useParams();
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  //console.log(error, error.err.response.data.message);
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
        <h2 className="page-title">Loading...</h2>
      ) : (
        <>
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
