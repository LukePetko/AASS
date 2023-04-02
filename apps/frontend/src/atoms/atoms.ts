import { atom } from "jotai";

const userAtom = atom<number | null>(
  Number(localStorage.getItem("userId")) || null
);

const persistUserAtom = atom(
  (get) => get(userAtom),
  (get, set, update: number | null) => {
    if (update === null) {
      localStorage.removeItem("userId");
    } else {
      localStorage.setItem("userId", String(update));
    }
    set(userAtom, update);
  }
);

export { userAtom, persistUserAtom };
