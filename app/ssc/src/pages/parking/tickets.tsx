"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import ParkingActionButton from "@/components/ui/parkingActionButton";

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
  <div className="text-center mb-8">
    <p className="text-xl">
      Ticket #{ticketNumber} | Issue Date: {issueDate} | Amount Due: ${amount}
    </p>
  </div>
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
    console.log("Navigate to payment page");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Tickets" />

      <main className="flex-1 flex flex-col p-6 mb-20">
        <h2 className="text-3xl font-normal text-center mb-8">
          Outstanding Tickets :
        </h2>

        {tickets.map((ticket) => (
          <TicketEntry
            key={ticket.ticketNumber}
            ticketNumber={ticket.ticketNumber}
            issueDate={ticket.issueDate}
            amount={ticket.amount}
          />
        ))}

        <div className="text-3xl font-normal text-center mb-12">
          Total Amount Due: ${totalAmount}
        </div>

        <div className="mt-auto">
          <ParkingActionButton
            label="Pay Parking Ticket"
            onClick={handlePayTicket}
          />
        </div>
      </main>

      <NavBar />
    </div>
  );
}
