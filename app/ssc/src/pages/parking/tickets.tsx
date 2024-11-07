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
import {
  CalendarIcon,
  CreditCardIcon,
  TicketIcon,
  CheckCircleIcon,
} from "lucide-react";

interface ViewToggleProps {
  activeView: "outstanding" | "paid";
  onViewChange: (view: "outstanding" | "paid") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  activeView,
  onViewChange,
}) => (
  <div className="flex rounded-lg overflow-hidden border border-[#841414] mb-6">
    <button
      onClick={() => onViewChange("outstanding")}
      className={`flex-1 py-2 px-6 text-lg ${
        activeView === "outstanding"
          ? "bg-[#841414] text-white"
          : "bg-white text-[#841414]"
      }`}
    >
      Outstanding
    </button>
    <button
      onClick={() => onViewChange("paid")}
      className={`flex-1 py-2 px-6 text-lg ${
        activeView === "paid"
          ? "bg-[#841414] text-white"
          : "bg-white text-[#841414]"
      }`}
    >
      Paid
    </button>
  </div>
);

interface TicketEntryProps {
  ticketNumber: string;
  issueDate: string;
  amount: number;
  isPaid?: boolean;
  paidDate?: string;
}

const TicketEntry: React.FC<TicketEntryProps> = ({
  ticketNumber,
  issueDate,
  amount,
  isPaid = false,
  paidDate,
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
      {isPaid && (
        <div className="flex items-center text-sm text-green-600 mt-2">
          <CheckCircleIcon className="mr-2 h-4 w-4" />
          Paid on: {paidDate}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function ParkingTicketsPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"outstanding" | "paid">(
    "outstanding"
  );

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

  const paidTickets = [
    {
      ticketNumber: "11111",
      issueDate: "12/01/2023",
      amount: 25,
      paidDate: "12/15/2023",
    },
    {
      ticketNumber: "22222",
      issueDate: "11/15/2023",
      amount: 30,
      paidDate: "11/30/2023",
    },
  ];

  const totalAmount = outstandingTickets.reduce(
    (sum, ticket) => sum + ticket.amount,
    0
  );

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
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />

        {activeView === "outstanding" ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Outstanding Tickets
            </h2>

            {outstandingTickets.map((ticket) => (
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
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Paid Tickets History
            </h2>

            {paidTickets.map((ticket) => (
              <TicketEntry
                key={ticket.ticketNumber}
                ticketNumber={ticket.ticketNumber}
                issueDate={ticket.issueDate}
                amount={ticket.amount}
                isPaid={true}
                paidDate={ticket.paidDate}
              />
            ))}
          </>
        )}
      </main>

      <NavBar />
    </div>
  );
}
