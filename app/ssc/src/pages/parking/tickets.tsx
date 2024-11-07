"use client";

import { useState } from "react";
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
  isSelected: boolean;
  onSelect: () => void;
}

const TicketEntry: React.FC<TicketEntryProps> = ({
  ticketNumber,
  issueDate,
  amount,
  isSelected,
  onSelect,
}) => (
  <Card className={`mb-4 ${isSelected ? "border-[#841414] border-2" : ""}`}>
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
    <CardFooter>
      <Button
        variant={isSelected ? "default" : "outline"}
        className={`w-full ${
          isSelected ? "bg-[#841414] text-white hover:bg-[#9a1818]" : ""
        }`}
        onClick={onSelect}
      >
        {isSelected ? "Deselect" : "Select"}
      </Button>
    </CardFooter>
  </Card>
);

export default function ParkingTicketsPage() {
  const router = useRouter();
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const outstandingTickets = [
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

  const totalAmount = outstandingTickets
    .filter((ticket) => selectedTickets.includes(ticket.ticketNumber))
    .reduce((sum, ticket) => sum + ticket.amount, 0);

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

  const handleSelectTicket = (ticketNumber: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketNumber)
        ? prev.filter((t) => t !== ticketNumber)
        : [...prev, ticketNumber]
    );
  };

  const handleSelectAll = () => {
    if (selectedTickets.length === outstandingTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(
        outstandingTickets.map((ticket) => ticket.ticketNumber)
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Parking Tickets" />

      <main className="flex-1 container max-w-md mx-auto p-4 mb-20 pt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Outstanding Tickets
        </h2>

        <Button
          variant="outline"
          className="w-full mb-4"
          onClick={handleSelectAll}
        >
          {selectedTickets.length === outstandingTickets.length
            ? "Deselect All"
            : "Select All"}
        </Button>

        {outstandingTickets.map((ticket) => (
          <TicketEntry
            key={ticket.ticketNumber}
            ticketNumber={ticket.ticketNumber}
            issueDate={ticket.issueDate}
            amount={ticket.amount}
            isSelected={selectedTickets.includes(ticket.ticketNumber)}
            onSelect={() => handleSelectTicket(ticket.ticketNumber)}
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
                disabled={selectedTickets.length === 0}
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Pay Selected Tickets
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <NavBar />
    </div>
  );
}
