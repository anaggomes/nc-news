import { useEffect, useState } from "react";
import { getArticleComments } from "../../apis/apis";

export default function ArticleComments({
  article_id,
  setIsCommentsLoading,
  comment_count,
}) {
  const [articleComments, setArticleComments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getArticleComments(article_id, page).then(({ comments }) => {
      const commentsDateFormatted = comments.map((comment) => {
        return {
          ...comment,
          created_at: comment.created_at.split("T")[0],
        };
      });
      setArticleComments((currentComments) => {
        return [...currentComments, ...commentsDateFormatted];
      });
      setIsCommentsLoading(false);
    });
  }, [article_id, page, setIsCommentsLoading]);

  function handleClick() {
    setPage((currentPage) => currentPage + 1);
  }
  return (
    <section>
      {articleComments.length > 0 ? (
        <>
          <h3>{comment_count} Comments:</h3>
          <ul>
            {articleComments.map((comment) => {
              return (
                <li key={comment.comment_id} className="article-comment-tile">
                  <h3 className="article-comments-author">{comment.author}</h3>
                  <p className="article-comments-date">{comment.created_at}</p>
                  <p className="article-comments-body">{comment.body}</p>

                  <span className="article-comments-votes">
                    {comment.votes} votes
                  </span>
                </li>
              );
            })}
          </ul>
          <button onClick={handleClick} disabled={page * 10 > comment_count}>
            See more
          </button>
        </>
      ) : (
        <h3>This article has no comments yet</h3>
      )}
    </section>
  );
}
