import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

export default function Login({ onLogin }: { onLogin: any }) {
  const [secret, setSecret] = useState("");
  const [_, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (secret === "secret") {
        setIsLoggedIn(true);
        onLogin();
      } else {
        alert("Invalid password");
      }
      setIsLoading(false);
    }, Math.floor(Math.random() * 500) + 500);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-3 w-64">
        <h1 className="font-semibold mb-4">☄️ SuperNova</h1>
        <Input
          autoFocus={true}
          type="password"
          placeholder="Enter a password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </div>
  );
}
