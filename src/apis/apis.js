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
      console.log(data);
      return data;
    });
}
