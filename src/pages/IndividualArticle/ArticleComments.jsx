import { useEffect, useState } from "react";
import { getArticleComments } from "../../apis/apis";
import PostComment from "./PostComment";

export default function ArticleComments({
  article_id,
  setIsCommentsLoading,
  isCommentsLoading,
  comment_count,
}) {
  const [articleComments, setArticleComments] = useState([]);
  const [page, setPage] = useState(1);
  const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
  const username = "cooljmessy"; //hard coded for now!
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
  }, [article_id, page]);

  function handleClick() {
    setPage((currentPage) => currentPage + 1);
  }

  function handleCommentButton() {
    setIsAddCommentClicked((currentStatus) => !currentStatus);
  }

  if (isCommentsLoading) return <h2 className="page-title">Loading...</h2>;

  return (
    <section id="display-comments">
      <h3 id="comments-number">{comment_count} Comments:</h3>
      <button className="add-comment-button" onClick={handleCommentButton}>
        Add a comment
      </button>

      {isAddCommentClicked && (
        <PostComment
          article_id={article_id}
          username={username}
          setIsCommentSubmitted={setIsCommentSubmitted}
          setArticleComments={setArticleComments}
          setIsAddCommentClicked={setIsAddCommentClicked}
        />
      )}
      {isCommentSubmitted && <h3>Your comment has been added!</h3>}
      {articleComments.length > 0 ? (
        <>
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
          <button
            className="see-more-button"
            onClick={handleClick}
            disabled={page * 10 > comment_count}
          >
            See more
          </button>
        </>
      ) : (
        <h3>This article has no comments yet</h3>
      )}
    </section>
  );
}
