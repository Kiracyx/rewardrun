import Header from "../components/Header/Header";
import BackToTop from "../components/BackToTop/BackToTop";
import Carousel from "../components/Header/Carousel";

export default function Rewards() {
  return (
    <>
      <Header compact />
      <main className="main">
        <section style={{ textAlign: "center", margin: "20px 0 10px" }}>
          <h1 className="main__title">Choose your reward</h1>
          <p className="recommended__subtext" style={{ opacity: 0.85 }}>
            Select a game from the carousel below to receive your code.
          </p>
        </section>

        <section className="carousel-section" id="rewards-carousel">
          <div className="carousel-container">
            <Carousel />
          </div>
        </section>
      </main>
      <footer className="footer site-footer">
        <p>
          Copyright © 2025 &nbsp; <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Terms and Conditions</a>
        </p>
        <p className="disclaimer">THIS IS AN INDEPENDENT SURVEY…</p>
      </footer>
      <BackToTop />
    </>
  );
}
