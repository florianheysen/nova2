import { useState } from "react";
import { useEventListener, useLocalStorage } from "usehooks-ts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Login({ onLogin }: { onLogin: any }) {
  const [_, setIsLoggedIn] = useLocalStorage<boolean>("isLoggedIn", false);
  const [secret, setSecret] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setError(null);
    if (secret.length <= 0) {
      setError("Password is required.");
    } else {
      setIsLoading(true);
      setTimeout(() => {
        if (secret === "secret") {
          setIsLoggedIn(true);
          onLogin();
        } else {
          setError("This password is incorrect.");
        }
        setIsLoading(false);
      }, Math.floor(Math.random() * 500) + 500);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEventListener("keydown", onKeyDown);

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
        {error && (
          <div className="flex gap-2 items-center w-full p-3 rounded bg-red-800/50">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
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
