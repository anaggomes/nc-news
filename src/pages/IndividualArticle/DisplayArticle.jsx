export default function DisplayArticle({ article }) {
  const {
    article_id,
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;

  return (
    <section className="display-article">
      <h1 className="display-article-topic">{topic}</h1>
      <h2 className="page-title display-article-title">{title}</h2>
      <img
        className="display-article-img"
        src={article_img_url}
        alt="article image uploaded by author"
      />
      <section className="display-article-authorAndDate">
        <p>author: {author}</p>
        <p>created: {created_at}</p>
      </section>
      <span className="display-article-votes">{votes} votes</span>
      <p className="display-article-body">{body}</p>
      <span className="display-article-comments">{comment_count} comments</span>
    </section>
  );
}