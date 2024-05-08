import { useEffect, useState } from "react";
import { getAllTopics } from "../apis/apis";
import { Link } from "react-router-dom";

export default function AllTopics() {
  const [allTopics, setAllTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(({ topics }) => {
      setAllTopics(topics);
    });
  }, []);

  return (
    <section className="page-components" id="topics-page">
      <h2 className="page-title">Find articles about each topic:</h2>
      <ul>
        {allTopics.map((topic) => {
          return (
            <Link to={`/articles?topic=${topic.slug}`} key={topic.slug}>
              <li className="topics-tiles">
                <h3>{topic.slug}</h3>
                <p>{topic.description}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}