import { useState } from "react";
import { patchArticleVotes } from "../../apis/apis";

export default function HandleArticleVotes({ article_id, currentVotes }) {
  const [voteChange, setVoteChange] = useState(0);
  const [totalVotes, setTotalVotes] = useState(currentVotes);
  const [error, setError] = useState({});
  function handleClick(vote) {
    patchArticleVotes(article_id, vote).catch((err) => {
      setError({
        message:
          "We are sorry we could not complete your request. Please try again later.",
      });
      setVoteChange(0);
      setTotalVotes(currentVotes);
    });
    setVoteChange((currentVote) => currentVote + vote);
    setTotalVotes((currentTotal) => currentTotal + vote);
    setError({});
  }

  return (
    <>
      <section className="article-votes">
        <button
          className="vote-up"
          onClick={() => {
            handleClick(1);
          }}
          disabled={voteChange === 1}
        >
          vote up
        </button>
        <span className="article-votes-count">{totalVotes}</span>

        <button
          className="vote-down"
          onClick={() => {
            handleClick(-1);
          }}
          disabled={voteChange === -1}
        >
          vote down
        </button>
        <span className="error-message">{error.message}</span>
      </section>
    </>
  );
}
