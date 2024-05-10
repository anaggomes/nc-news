import { useContext, useState } from "react";
import { postArticleComment } from "../../apis/apis";
import { UserContext } from "../../contexts/User";

export default function PostComment({
  article_id,
  setIsCommentSubmitted,
  setArticleComments,
  setIsAddCommentClicked,
}) {
  const { userLogIn } = useContext(UserContext);

  const username = userLogIn.username;
  const [commentInput, setCommentInput] = useState({ username });
  const [commentError, setCommentError] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitClicked(true);
    const { body } = commentInput;
    if (!body || !/[a-zA-Z]/.test(body)) {
      setCommentError({
        msg: "Comments can not be empty and must include at least one letter",
      });
      setIsSubmitClicked(false);
    } else {
      postArticleComment(commentInput, article_id)
        .then(({ comment }) => {
          const commentDateFormatted = {
            ...comment,
            created_at: comment.created_at.split("T")[0],
          };
          setCommentError({});
          setIsAddCommentClicked(false);
          setIsCommentSubmitted(true);
          setCommentInput((currentInput) => {
            return { ...currentInput, body: "" };
          });
          setArticleComments((currentArticles) => [
            commentDateFormatted,
            ...currentArticles,
          ]);
          setCommentError({});
        })
        .catch((err) => {
          setCommentError({
            msg: "Sorry we could not complete your request. Please try again later",
          });
          setIsSubmitClicked(false);
        });
    }
  }

  return (
    <>
      {
        <form onSubmit={handleSubmit} className="new-comment-form">
          <label htmlFor="comment-input">{username}</label>
          <textarea
            placeholder="Add a comment..."
            id="comment-input"
            value={commentInput.body}
            onChange={(e) => {
              setCommentInput(() => {
                return { ...commentInput, body: e.target.value };
              });
            }}
          />
          <span className="error-message">{commentError.msg}</span>
          <button
            className="send-comment-button"
            type="submit"
            disabled={isSubmitClicked}
          >
            Send
          </button>
        </form>
      }
    </>
  );
}
