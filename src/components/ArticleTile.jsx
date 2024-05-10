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
    <li className="article tiles">
      <h4 className="article-tiles-topic">{topic}</h4>
      <h5 className="article-tiles-title">{title}</h5>
      <img
        className="article-tiles-image"
        src={article_img_url}
        alt="article image uploaded by author"
      />
      <p className="article-tiles-author">{author}</p>
      <p className="article-tiles-date">{created_at}</p>
    </li>
  );
}
