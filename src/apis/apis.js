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
