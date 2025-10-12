import Carousel from "./Carousel";

export default function Header({ compact = false }: { compact?: boolean }) {
  return (
    <header className="header" id="header">
      {!compact && (
        <div className="header__bottom">
          <span className="main__title">Choose your reward</span>
          <div className="carousel-container">
            <Carousel />
          </div>
        </div>
      )}
    </header>
  );
}
