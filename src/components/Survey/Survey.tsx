import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    q: "Which platform do you use most?",
    options: ["Steam", "PlayStation", "Xbox", "Nintendo"],
  },
  {
    q: "How often do you buy games?",
    options: ["Monthly", "Quarterly", "Only on sales", "Rarely"],
  },
  { q: "Favorite mode?", options: ["Solo", "Co-op", "PvP", "MMO"] },
  {
    q: "What do you value most?",
    options: ["Gameplay", "Story", "Graphics", "Online"],
  },
  {
    q: "Pick a genre you like most:",
    options: ["RPG", "Shooter", "Strategy", "Indie"],
  },
];

export default function Survey() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(QUESTIONS.length).fill(null)
  );
  const [timer, setTimer] = useState(4 * 60);
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const timeText = useMemo(() => {
    const m = String(Math.floor(timer / 60)).padStart(2, "0");
    const s = String(timer % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [timer]);

  const current = QUESTIONS[idx];
  const done = idx === QUESTIONS.length;

  function setAnswer(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = i;
      return next;
    });
  }
  function next() {
    if (answers[idx] == null) {
      // tiny shake
      const el = document.getElementById("quizCard");
      el?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 220 }
      );
      return;
    }
    if (idx === QUESTIONS.length - 1) {
      // store & show done
      localStorage.setItem("surveyAnswers", JSON.stringify(answers));
      setIdx((i) => i + 1);
    } else setIdx((i) => i + 1);
  }

  return (
    <section className="survey" id="survey">
      <div className="survey__head">
        <h2 className="main__title">CONGRATULATIONS!</h2>
        <p className="survey__date" id="surveyDate">
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="survey__card">
        <p className="survey__lead">
          Complete this short survey about your gaming experience and select
          your gift code.&nbsp;
          <span className="survey__muted">
            Instant delivery after completion.
          </span>
        </p>
        <div className="survey__timer">
          TIME REMAINING: <span id="timer">{timeText}</span>
        </div>

        {!done ? (
          <div className="quiz" id="quiz">
            <div id="quizCard" className="quiz__card">
              <div className="q-title">
                {idx + 1}. {current.q}
              </div>
              <div className="options">
                {current.options.map((o, i) => (
                  <label className="option" key={i}>
                    <input
                      type="radio"
                      name={`q${idx}`}
                      checked={answers[idx] === i}
                      onChange={() => setAnswer(i)}
                    />
                    <span>{o}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="quiz__nav">
              <button
                className="btn btn--ghost"
                disabled={idx === 0}
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
              >
                Back
              </button>
              <button className="btn btn--primary" onClick={next}>
                {idx === QUESTIONS.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div id="quizDone" className="quiz__done">
            <h3>Done! 🎉</h3>
            <p className="survey__muted">
              Thanks! Your answers were saved. Proceed to choose reward.
            </p>
            <button className="btn btn--accent" onClick={() => nav("/rewards")}>
              Choose your reward
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
