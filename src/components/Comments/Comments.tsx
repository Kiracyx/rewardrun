import type { FormEvent } from "react";
import { useComments } from "./useComments";

export default function Comments() {
  const { comments, add, toggleLike, liked } = useComments();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const text = String(fd.get("text") || "").trim();
    if (!name || !text) return;
    add(name, text);
    e.currentTarget.reset();
  }

  return (
    <section className="comments" id="comments">
      <h3 className="comments__title">Recent Comments:</h3>
      <form className="comment-form" id="commentForm" onSubmit={onSubmit}>
        <input name="name" type="text" placeholder="Your name" required />
        <input
          name="text"
          type="text"
          placeholder="Write a comment..."
          required
        />
        <button type="submit" className="btn btn--primary">
          Publish
        </button>
      </form>

      <ul className="comment-list">
        {comments.map((c) => (
          <li className="comment" key={c.id} data-id={c.id}>
            <div className="comment__row">
              <img
                className="comment__avatar"
                src={c.avatar}
                alt={`Avatar of ${c.name}`}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/avatars/anonymous.png";
                }}
              />
              <div className="comment__body">
                <div className="comment__meta">
                  <strong>{c.name}</strong>
                  <span>•</span>
                  <span>{c.time}</span>
                  <span>•</span>
                  <span>Verified customer</span>
                </div>
                <p className="comment__text">{c.text}</p>
                <button
                  type="button"
                  className={`comment__like ${
                    liked.has(c.id) ? "is-liked" : ""
                  }`}
                  aria-pressed={liked.has(c.id)}
                  onClick={() => toggleLike(c.id)}
                >
                  <span className="comment__like-ico" aria-hidden>
                    ❤
                  </span>
                  <span className="comment__like-count">{c.likes || 0}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
