import { useState } from "react";
import { useEffect } from "react";
import { getAllArticles } from "../../apis/apis";
import { ArticleTiles } from "../../components/ArticleTile";
import { Link, useSearchParams } from "react-router-dom";
import FilterOptions from "./FilterOptions";
import ErrorPage from "../ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortByClicked, setSortByClicked] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    getAllArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ articles, total_count }) => {
        const articlesDateFormatted = articles.map((article) => {
          return { ...article, created_at: article.created_at.split("T")[0] };
        });
        setAllArticles(articlesDateFormatted);

        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [sortByQuery, orderQuery, topicQuery]);

  if (error)
    return (
      <ErrorPage
        message={error.err.response.data.message}
        status={error.err.response.status}
      />
    );
  return (
    <section className="page-components">
      {isLoading ? (
        <LoadingComponent />
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
          <ul>
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
          </ul>
        </>
      )}
    </section>
  );
}
