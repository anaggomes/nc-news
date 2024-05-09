import "./App.css";
import AllArticles from "./pages/AllArticles/AllArticles.jsx";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { Routes, Route } from "react-router-dom";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";
import { UserProvider } from "./contexts/User";
import AllTopics from "./pages/AllTopics";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
        <Route path="/topics" element={<AllTopics />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </UserProvider>
  );
}

export default App;
