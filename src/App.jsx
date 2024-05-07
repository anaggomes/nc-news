import "./App.css";
import AllArticles from "./pages/AllArticles";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { Routes, Route } from "react-router-dom";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
