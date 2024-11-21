import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import HomeScreen from "./home";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();// prevent page reload
    // Handle login logic here
    console.log("Login attempted with:", email, password);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isLoggedIn ? (
        <HomeScreen onLogout={handleLogout} />
      ) : (
        <>
          <div className="w-full h-[313px] bg-[#8B1A1A] rounded-b-[50px] relative overflow-hidden">
            <Image
              src="/SSC-Logo.png"
              alt="Student Service Center Logo"
              layout="fill"
              objectFit="cover"
              className="opacity-100"
            />
          </div>
          <div className="flex-grow flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-red-800 hover:bg-red-700"
                  >
                    SIGN IN
                  </Button>
                </form>
                <div className="text-center mt-4">
                  <a href="#" className="text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
