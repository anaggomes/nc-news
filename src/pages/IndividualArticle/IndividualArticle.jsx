import { useEffect, useState } from "react";
import { getArticleByID } from "../../apis/apis";
import { useParams } from "react-router-dom";
import DisplayArticle from "./DisplayArticle";

export default function IndividualArticle() {
  const [singleArticle, setSingleArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleByID(article_id).then(({ article }) => {
      const articleDateFormatted = {
        ...article,
        created_at: article.created_at.split("T")[0],
      };
      setSingleArticle(articleDateFormatted);
      setIsArticleLoading(false);
    });
  }, [article_id]);

  return (
    <section className="page-components" id="individual-article">
      {isArticleLoading ? (
        <h2 className="page-title">Loading...</h2>
      ) : (
        <DisplayArticle article={singleArticle} />
      )}
    </section>
  );
}
