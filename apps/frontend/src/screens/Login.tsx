import { useAtom } from "jotai";
import { useRef } from "react";
import { persistUserAtom } from "../atoms/atoms";

const login = async (username: string, password: string) => {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const userId = await response.json();

  return userId.id;
};

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useAtom(persistUserAtom);

  return (
    <div className="flex h-full justify-center items-center">
      <div className="flex flex-col w-[400px]">
        <input ref={usernameRef} type="text" />
        <div>
          <label
            htmlFor="username"
            className="w-full block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Používateľské meno
          </label>
          <input
            type="text"
            id="username"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Používateľké meno"
            required
            ref={usernameRef}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="w-full block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          >
            Heslo
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Heslo"
            required
            ref={passwordRef}
          />
        </div>
        <div>
          <button
            type="button"
            className="w-full text-primary-900 bg-primary-200 hover:bg-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={async () => {
              setUserId(
                await login(
                  usernameRef.current!.value,
                  passwordRef.current!.value
                )
              );
            }}
          >
            Prihlásiť sa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
