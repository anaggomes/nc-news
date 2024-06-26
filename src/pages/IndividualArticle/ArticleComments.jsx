import { useEffect, useState } from "react";
import { getArticleComments } from "../../apis/apis";
import PostComment from "./PostComment";
import CommentTiles from "./CommentTiles";

export default function ArticleComments({
  article_id,
  setIsCommentsLoading,
  isCommentsLoading,
  comment_count,
}) {
  const [articleComments, setArticleComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getArticleComments(article_id, limit).then(({ comments }) => {
      const commentsDateFormatted = comments.map((comment) => {
        return {
          ...comment,
          created_at: comment.created_at.split("T")[0],
        };
      });
      setArticleComments(commentsDateFormatted);
      setIsCommentsLoading(false);
    });
  }, [article_id, isDeleted, limit, setIsCommentsLoading]);

  function handleLimitClick() {
    setLimit((currentLimit) => currentLimit + 10);
  }

  function handleCommentButton() {
    setIsCommentSubmitted(false);
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
          setIsCommentSubmitted={setIsCommentSubmitted}
          setArticleComments={setArticleComments}
          setIsAddCommentClicked={setIsAddCommentClicked}
        />
      )}
      {isCommentSubmitted && <h3>Your comment has been added!</h3>}
      {articleComments.length > 0 ? (
        <>
          <ul>
            <CommentTiles
              articleComments={articleComments}
              setIsDeleted={setIsDeleted}
              setIsCommentSubmitted={setIsCommentSubmitted}
            />
          </ul>
          <button
            className="no-background-button"
            onClick={handleLimitClick}
            disabled={limit > comment_count}
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
