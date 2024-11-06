import { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/home');
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
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
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    className="w-full bg-red-800 hover:bg-red-700"
                >
                  Sign In
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
      </div>
  );
}