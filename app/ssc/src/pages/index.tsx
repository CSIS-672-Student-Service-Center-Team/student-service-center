import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, CreditCard, Utensils } from 'lucide-react'
import HomeScreen from './HomeScreen'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempted with:', email, password)
    setIsLoggedIn(true)
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {isLoggedIn ? (
            <HomeScreen onLogout={handleLogout} />
        ) : (
            <Card className="w-full max-w-md">
              <CardHeader className="bg-red-800 text-white text-center py-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <CreditCard size={24} />
                  <GraduationCap size={24} />
                  <Utensils size={24} />
                </div>
                <CardTitle className="text-2xl font-bold">STUDENT SERVICE CENTER</CardTitle>
              </CardHeader>
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
                  <Button type="submit" className="w-full bg-red-800 hover:bg-red-700">
                    Sign In
                  </Button>
                </form>
                <div className="text-center mt-4">
                  <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                </div>
              </CardContent>
            </Card>
        )}
      </div>
  )
}