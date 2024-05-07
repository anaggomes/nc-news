import axios from "axios";

export function getAllArticles() {
  return axios
    .get("https://nc-news-dkoj.onrender.com/api/articles")
    .then(({ data }) => {
      return data;
    });
}
