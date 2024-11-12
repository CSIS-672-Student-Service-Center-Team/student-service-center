import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Header from "@/components/ui/pageHeader"
import NavBar from "@/components/ui/navBar"

export default function TransactionConfirmation() {
  const router = useRouter()
  const { confirmationNumber, amount, fromURL } = router.query

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header 
        title="Transaction Confirmation"
        onBackClick={()=>router.back()}
      />

      {/* <main className="flex-1 flex items-center justify-center px-4 py-8"> */}
      <main className="content">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Transaction Successful</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Confirmation Number</p>
              <p className="text-lg font-semibold">{confirmationNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Transaction Amount</p>
              <p className="text-2xl font-bold">${parseFloat(amount as string).toFixed(2)}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => router.push(`/${fromURL}`)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Back to {fromURL}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <NavBar />
    </div>
  )
}