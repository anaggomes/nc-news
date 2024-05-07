export function ArticleTiles({ article }) {
  const {
    article_id,
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  return (
    <section className="article-tiles">
      <h2 className="article-tiles-topic">{topic}</h2>
      <h3 className="article-tiles-title">{title}</h3>
      <img
        className="article-tiles-image"
        src={article_img_url}
        alt="article image uploaded by author"
      />
      <p className="article-tiles-author">{author}</p>
      <p className="article-tiles-date">{created_at}</p>
    </section>
  );
}
