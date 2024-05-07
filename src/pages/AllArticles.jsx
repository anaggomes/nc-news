import { useState } from "react";
import { useEffect } from "react";
import { getAllArticles } from "../apis/apis";
import { ArticleTiles } from "../components/ArticleTile";

import { Link } from "react-router-dom";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllArticles().then(({ articles }) => {
      const articlesDateFormatted = articles.map((article) => {
        return { ...article, created_at: article.created_at.split("T")[0] };
      });
      setAllArticles(articlesDateFormatted);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="page-components">
      {isLoading ? (
        <h2 className="page-title">Loading...</h2>
      ) : (
        <>
          <h2 className="page-title">All articles</h2>

          {allArticles.map((article) => {
            return (
              <Link
                to={`/articles/${article.article_id}`}
                key={article.article_id}
              >
                <ArticleTiles article={article} />
              </Link>
            );
          })}
        </>
      )}
    </section>
  );
}
