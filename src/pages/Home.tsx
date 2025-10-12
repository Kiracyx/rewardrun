import Header from "../components/Header/Header";
import Survey from "../components/Survey/Survey";
import Comments from "../components/Comments/Comments";
import BackToTop from "../components/BackToTop/BackToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <Survey />
        <Comments />
      </main>
      <footer className="footer site-footer">
        <p>
          Copyright © 2025 &nbsp;
          <a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a>
        </p>
        <p className="disclaimer">
          THIS IS AN INDEPENDENT SURVEY. This website is not affiliated…
        </p>
      </footer>
      <BackToTop />
    </>
  );
}
