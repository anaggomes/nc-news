import { useContext, useState } from "react";
import { deleteComment } from "../../apis/apis";
import { UserContext } from "../../contexts/User";

export default function CommentTiles({
  articleComments,
  setIsDeleted,
  setIsCommentSubmitted,
}) {
  const [deleteError, setDeleteError] = useState({});
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const { userLogIn } = useContext(UserContext);
  const username = userLogIn.username;
  function handleDelete(comment_id) {
    setIsDeleted(false);
    setIsDeleteClicked(true);
    deleteComment(comment_id)
      .then(() => {
        setIsDeleted(true);
        setIsDeleteClicked(false);
        setIsCommentSubmitted(false);
      })
      .catch(({ err }) => {
        setDeleteError({
          msg: "We are sorry we could not complete your request. Please try again later.",
        });
        setIsDeleted(false);
        setIsDeleteClicked(false);
      });
  }

  return articleComments.map((comment) => {
    const deleteAllowed = username === comment.author;
    return (
      <li key={comment.comment_id} className="article-comment-tile">
        <h3 className="article-comments-author">{comment.author}</h3>
        <p className="article-comments-date">{comment.created_at}</p>
        <p className="article-comments-body">{comment.body}</p>
        {deleteAllowed && (
          <>
            <button
              onClick={() => {
                handleDelete(comment.comment_id);
              }}
              className="delete-button"
              disabled={isDeleteClicked}
            >
              Delete comment?
            </button>
            <span>{deleteError.msg}</span>
          </>
        )}
        <span className="article-comments-votes">{comment.votes} votes</span>
      </li>
    );
  });
}
