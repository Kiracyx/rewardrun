import { useEffect, useState, useCallback } from "react";

export type Comment = {
  id: string;
  name: string;
  text: string;
  time: string;
  likes: number;
  avatar: string;
};

const LIST_KEY = "siteComments";
const LIKED_KEY = "siteLikedCommentsV1";
const DEFAULT_AVATAR = "/assets/images/avatars/anonymous.png";

const seed: Comment[] = [
  {
    id: "c1",
    name: "Mario J Silva",
    text: "Got my code instantly. Worked in Steam!",
    time: "8 hours ago",
    likes: 12,
    avatar: "/assets/images/avatars/user1.jpg",
  },
  {
    id: "c2",
    name: "Viviana Robles",
    text: "Picked GTA V gift card, no issues so far.",
    time: "14 hours ago",
    likes: 17,
    avatar: "/assets/images/avatars/user2.jpg",
  },
  {
    id: "c3",
    name: "Dana Byerly",
    text: "Thanks! Took the seasonal bundle.",
    time: "1 day ago",
    likes: 5,
    avatar: "/assets/images/avatars/user3.jpg",
  },
];

const resolveAvatar = (v?: string) => (v && v.trim() ? v : DEFAULT_AVATAR);

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const raw = localStorage.getItem(LIST_KEY);
    let list: Comment[] = raw ? JSON.parse(raw) : seed;
    list = list.map((c) => ({
      ...c,
      id: c.id || crypto.randomUUID(),
      likes: typeof c.likes === "number" ? c.likes : 0,
      avatar: resolveAvatar(c.avatar),
    }));
    setComments(list);
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
    const likedRaw = localStorage.getItem(LIKED_KEY);
    setLiked(new Set(likedRaw ? JSON.parse(likedRaw) : []));
  }, []);

  const add = useCallback((name: string, text: string) => {
    const item: Comment = {
      id: crypto.randomUUID(),
      name,
      text,
      time: "Just now",
      likes: 0,
      avatar: DEFAULT_AVATAR,
    };
    setComments((prev) => {
      const next = [item, ...prev];
      localStorage.setItem(LIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleLike = useCallback(
    (id: string) => {
      setComments((prev) => {
        const next = prev.map((c) =>
          c.id === id
            ? { ...c, likes: (c.likes || 0) + (liked.has(id) ? -1 : 1) }
            : c
        );
        localStorage.setItem(LIST_KEY, JSON.stringify(next));
        return next;
      });
      setLiked((prev) => {
        const copy = new Set(prev);
        copy.has(id) ? copy.delete(id) : copy.add(id);
        localStorage.setItem(LIKED_KEY, JSON.stringify([...copy]));
        return copy;
      });
    },
    [liked]
  );

  return { comments, add, toggleLike, liked };
}
