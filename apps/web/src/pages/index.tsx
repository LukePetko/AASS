import { useEffect, useState } from "react";
import { Button } from "ui";

const API_HOST = process.env.API_PORT || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState<string>("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(`${API_HOST}/message/${name}`);
      const response = await result.json();
      setResponse(response);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const onReset = () => {
    setName("");
  };

  const login = async () => {
    const result = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
    });

    const response = await result.json();

    console.log(response);
  };

  return (
    <div>
      <h1>Web</h1>
      <button onClick={login}>Hello</button>
    </div>
  );
}
