import axios from "axios";

export function getAllArticles() {
  return axios
    .get("https://nc-news-dkoj.onrender.com/api/articles")
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

export function getArticleComments(article_id, page) {
  return axios
    .get(
      `https://nc-news-dkoj.onrender.com/api/articles/${article_id}/comments?p=${page}`
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

export function postArticleComment(body, article_id) {
  return axios
    .post(
      `https://nc-news-dkoj.onrender.com/api/articles/${article_id}/comments`,
      body
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
}
