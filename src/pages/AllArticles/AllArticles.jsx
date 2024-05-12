import { useContext, useState } from "react";
import { useEffect } from "react";
import { getAllArticles } from "../../apis/apis";
import { ArticleTiles } from "../../components/ArticleTile";
import { Link, useSearchParams } from "react-router-dom";
import FilterOptions from "./FilterOptions";
import ErrorPage from "../../components/ErrorPage";
import LoadingComponent from "../../components/LoadingComponent";
import { TotalArticlesContext } from "../../contexts/TotalArticles";

export default function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortByClicked, setSortByClicked] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { totalArticles, setTotalArticles } = useContext(TotalArticlesContext);

  const topicQuery = searchParams.get("topic") || "";
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order_by");
  const authorQuery = searchParams.get("author");

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
  function handlePagination(value) {
    setPage((currentPage) => currentPage + value);
  }
  useEffect(() => {
    setError(null);
    getAllArticles(
      topicQuery,
      sortByQuery,
      orderQuery,
      limit,
      page,
      authorQuery
    )
      .then(({ articles, total_count }) => {
        const articlesDateFormatted = articles.map((article) => {
          return { ...article, created_at: article.created_at.split("T")[0] };
        });
        setAllArticles(articlesDateFormatted);
        setTotalArticles(total_count);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [sortByQuery, orderQuery, topicQuery, page]);

  if (error)
    return (
      <ErrorPage
      // message={error.err.response.data.message}
      // status={error.err.response.status}
      />
    );
  return (
    <section className="page-components">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <h2 className="page-title">All {topicQuery} articles</h2>

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
          <ul id="all-articles-container">
            {allArticles.map((article) => {
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                  state={totalArticles}
                >
                  <ArticleTiles article={article} />
                </Link>
              );
            })}
          </ul>
          <section className="articles-pagination">
            <button
              className="no-background-button"
              onClick={() => {
                handlePagination(-1);
              }}
              disabled={page === 1}
            >
              Previous page
            </button>
            <span>{page}</span>
            <button
              className="no-background-button"
              onClick={() => {
                handlePagination(1);
              }}
              disabled={page * limit >= totalArticles}
            >
              Next page
            </button>
          </section>
        </>
      )}
    </section>
  );
}
