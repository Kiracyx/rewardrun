import { useEffect, useRef, useState } from "react";

const ITEM_WIDTH = 220; // card width incl. gap

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isAuto, setIsAuto] = useState(true);
  const speed = 0.5; // px per frame
  const rafRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const originalLenRef = useRef<number>(0);

  const images = [
    "/assets/images/sample/reward1.jpg",
    "/assets/images/sample/reward2.jpg",
    "/assets/images/sample/reward3.jpg",
    "/assets/images/sample/reward4.jpg",
    "/assets/images/sample/reward5.jpg",
    "/assets/images/sample/reward6.jpg",
    "/assets/images/sample/reward7.jpg",
  ];

  // clone items once
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    originalLenRef.current = el.children.length;
    for (let i = 0; i < originalLenRef.current; i++) {
      const clone = el.children[i].cloneNode(true);
      clone && el.appendChild(clone);
    }
  }, []);

  // auto scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      if (isAuto) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAuto]);

  // hover pause (track + buttons)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const stop = () => setIsAuto(false);
    const start = () => setIsAuto(true);
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchend", start);
    return () => {
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
      el.removeEventListener("touchstart", stop as any);
      el.removeEventListener("touchend", start);
    };
  }, []);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    setIsAuto(false);
    el.scrollLeft += dir * ITEM_WIDTH;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft <= 0) el.scrollLeft = ITEM_WIDTH * originalLenRef.current;
    if (el.scrollLeft >= half) el.scrollLeft = 0;
  };

  const hold = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    setIsAuto(false);
    holdRef.current = window.setInterval(() => {
      el.scrollLeft += (dir * ITEM_WIDTH) / 10;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft <= 0)
        el.scrollLeft = ITEM_WIDTH * originalLenRef.current;
      if (el.scrollLeft >= half) el.scrollLeft = 0;
    }, 16);
  };
  const stopHold = () => {
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
  };

  return (
    <>
      <button
        className="nav left"
        aria-label="prev"
        onMouseEnter={() => setIsAuto(false)}
        onMouseDown={() => hold(-1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => hold(-1)}
        onTouchEnd={stopHold}
        onClick={() => nudge(-1)}
      >
        <img
          className="arrow-icon"
          src="/assets/images/icons/arrow-left.svg"
          alt="prev"
        />
      </button>

      <div className="carousel" id="carousel" ref={trackRef}>
        {images.map((src, i) => (
          <a key={i} href="#">
            <img src={src} alt={`Reward ${i + 1}`} loading="lazy" />
          </a>
        ))}
      </div>

      <button
        className="nav right"
        aria-label="next"
        onMouseEnter={() => setIsAuto(false)}
        onMouseDown={() => hold(1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => hold(1)}
        onTouchEnd={stopHold}
        onClick={() => nudge(1)}
      >
        <img
          className="arrow-icon"
          src="/assets/images/icons/arrow-right.svg"
          alt="next"
        />
      </button>
    </>
  );
}
