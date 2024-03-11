import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-3 w-64">
        <h1 className="font-semibold mb-4">☄️ SuperNova</h1>
        <Input
          autoFocus={true}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
