import "./App.css";
import AllArticles from "./pages/AllArticles/AllArticles.jsx";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { Routes, Route } from "react-router-dom";
import IndividualArticle from "./pages/IndividualArticle/IndividualArticle";
import { UserProvider } from "./contexts/User";
import AllTopics from "./pages/AllTopics";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import { TotalArticlesProvider } from "./contexts/TotalArticles.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
  return (
    <UserProvider>
      <Header />
      <TotalArticlesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:article_id" element={<IndividualArticle />} />
          <Route path="/topics" element={<AllTopics />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </TotalArticlesProvider>
      <Footer />
    </UserProvider>
  );
}

export default App;
