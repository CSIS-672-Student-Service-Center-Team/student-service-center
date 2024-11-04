import { useRouter } from "next/navigation";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Ticket, Car } from "lucide-react";

export default function ParkingPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const services = [
    {
      title: "Manage Parking Pass",
      description: "View, renew, or purchase parking passes",
      icon: CreditCard,
      path: "/parking/pass",
    },
    {
      title: "Parking Tickets",
      description: "View and pay outstanding parking tickets",
      icon: Ticket,
      path: "/parking/tickets",
    },
    {
      title: "Parking Availability",
      description: "Check real-time parking space availability",
      icon: Car,
      path: "/parking/availability",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Parking Services" isHomeScreen={false} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#841414]">
          Welcome to Parking Services
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.path}
              className="transition-all duration-300 hover:shadow-lg border-[#841414] border-t-4"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#841414]">
                  <service.icon className="w-6 h-6" />
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <Button
                  className="w-full bg-[#841414] hover:bg-[#9a1818] text-white flex items-center justify-center gap-2"
                  onClick={() => handleNavigation(service.path)}
                >
                  <service.icon className="w-5 h-5" />
                  Access
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <NavBar />
    </div>
  );
}
