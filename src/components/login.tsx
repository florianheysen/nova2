import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Login({ onLogin }: { onLogin: any }) {
  const [password, setPassword] = useState("");
  const [_, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const handleLogin = () => {
    if (password === "secret") {
      setIsLoggedIn(true);
      onLogin();
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-red-200">
      <div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
