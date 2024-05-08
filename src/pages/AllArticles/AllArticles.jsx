import { useState } from "react";
import { useEffect } from "react";
import { getAllArticles } from "../../apis/apis";
import { ArticleTiles } from "../../components/ArticleTile";
import { Link, useSearchParams } from "react-router-dom";
import FilterOptions from "./FilterOptions";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortByClicked, setSortByClicked] = useState(false);

  const topicQuery = searchParams.get("topic") || "";
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order_by");

  function setOrder(direction) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("order_by", direction);
    setSearchParams(newParams);
  }
  function setSortBy(query) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("sort_by", query);
    setSearchParams(newParams);
  }

  useEffect(() => {
    getAllArticles(topicQuery, sortByQuery, orderQuery).then(({ articles }) => {
      const articlesDateFormatted = articles.map((article) => {
        return { ...article, created_at: article.created_at.split("T")[0] };
      });
      setAllArticles(articlesDateFormatted);

      setIsLoading(false);
    });
  }, [sortByQuery, orderQuery, topicQuery]);

  return (
    <section className="page-components">
      {isLoading ? (
        <h2 className="page-title">Loading...</h2>
      ) : (
        <>
          <h2 className="page-title">All articles</h2>
          <button
            id="filter-button"
            onClick={() => {
              setSortByClicked((currentStatus) => !currentStatus);
            }}
          >
            {!isSortByClicked ? "See " : "Hide"} filter options
          </button>
          {isSortByClicked && (
            <FilterOptions setSortBy={setSortBy} setOrder={setOrder} />
          )}

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
