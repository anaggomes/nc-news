import axios from "axios";

export function getAllArticles(topic, sort_by, order_by, limit, p, author) {
  return axios
    .get("https://nc-news-dkoj.onrender.com/api/articles", {
      params: { topic, sort_by, order_by, limit, p, author },
    })
    .then(({ data }) => {
      return data;
    });
}

export function getArticleByID(article_id) {
  return axios
    .get(`https://nc-news-dkoj.onrender.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data;
    });
}

export function getArticleComments(article_id, limit) {
  return axios
    .get(
      `https://nc-news-dkoj.onrender.com/api/articles/${article_id}/comments?limit=${limit}`
    )
    .then(({ data }) => {
      return data;
    });
}

export function patchArticleVotes(article_id, vote) {
  return axios
    .patch(`https://nc-news-dkoj.onrender.com/api/articles/${article_id}`, {
      inc_votes: vote,
    })
    .then(({ data }) => {
      return data;
    });
}
export function patchCommentVotes(comment_id, vote) {
  console.log(comment_id, vote);
  return axios
    .patch(`https://nc-news-dkoj.onrender.com/api/comments/${comment_id}`, {
      inc_votes: vote,
    })
    .then(({ data }) => {
      return data;
    });
}

export function postArticleComment(body, article_id) {
  return axios
    .post(
      `https://nc-news-dkoj.onrender.com/api/articles/${article_id}/comments`,
      body
    )
    .then(({ data }) => {
      return data;
    });
}

export function deleteComment(comment_id) {
  return axios.delete(
    `https://nc-news-dkoj.onrender.com/api/comments/${comment_id}/`
  );
}

export function getUserByUsername(username) {
  return axios
    .get(`https://nc-news-dkoj.onrender.com/api/users/${username}/`)
    .then(({ data }) => {
      return data;
    });
}

export function getAllTopics() {
  return axios
    .get(`https://nc-news-dkoj.onrender.com/api/topics`)
    .then(({ data }) => {
      return data;
    });
}

export function getPopularArticles() {
  return axios
    .get("https://nc-news-dkoj.onrender.com/api/articles?sort_by=votes&limit=4")
    .then(({ data }) => {
      return data;
    });
}

export function getAllUsers() {
  return axios
    .get("https://nc-news-dkoj.onrender.com/api/users")
    .then(({ data }) => {
      return data;
    });
}
