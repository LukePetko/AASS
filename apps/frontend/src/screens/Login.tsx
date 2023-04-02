import { useRef } from "react";
import { useQuery } from "react-query";

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

  console.log(userId);

  localStorage.setItem("userId", userId.id);
  window.location.reload();
};

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={usernameRef} type="text" />
      <input ref={passwordRef} type="password" />
      <button
        onClick={() =>
          login(usernameRef.current!.value, passwordRef.current!.value)
        }
      >
        Login
      </button>
      <button
        type="button"
        className="text-white bg-purple-100 hover:bg-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Default
      </button>
    </div>
  );
};

export default Login;
