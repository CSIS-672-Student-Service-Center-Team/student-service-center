"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutData } from "@/pages/checkout";
import { CalendarIcon, CreditCardIcon, TicketIcon } from "lucide-react";

interface TicketEntryProps {
  ticketNumber: string;
  issueDate: string;
  amount: number;
}

const TicketEntry: React.FC<TicketEntryProps> = ({
  ticketNumber,
  issueDate,
  amount,
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="flex items-center">
          <TicketIcon className="mr-2 h-5 w-5" />
          Ticket #{ticketNumber}
        </span>
        <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center text-sm text-muted-foreground">
        <CalendarIcon className="mr-2 h-4 w-4" />
        Issue Date: {issueDate}
      </div>
    </CardContent>
  </Card>
);

export default function ParkingTicketsPage() {
  const router = useRouter();

  const tickets = [
    {
      ticketNumber: "12345",
      issueDate: "01/12/2024",
      amount: 20,
    },
    {
      ticketNumber: "123456",
      issueDate: "01/15/2024",
      amount: 15,
    },
  ];

  const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.amount, 0);

  const handlePayTicket = () => {
    let checkoutData: CheckoutData = {
      payment: {
        cardName: "",
        cardNumber: "",
        expDate: "",
        csv: "",
      },
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    router.push(`/checkout?price=${totalAmount}&type=parking&from=parking`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Parking Tickets" />

      <main className="flex-1 container max-w-md mx-auto p-4 mb-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Outstanding Tickets
        </h2>

        {tickets.map((ticket) => (
          <TicketEntry
            key={ticket.ticketNumber}
            ticketNumber={ticket.ticketNumber}
            issueDate={ticket.issueDate}
            amount={ticket.amount}
          />
        ))}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Amount Due</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-center">
                ${totalAmount.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#841414] hover:bg-[#9a1818]"
                onClick={handlePayTicket}
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Pay Parking Tickets
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <NavBar />
    </div>
  );
}
