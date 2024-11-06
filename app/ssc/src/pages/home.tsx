'use client'

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, CreditCard, Utensils, Car } from 'lucide-react';

interface UserData {
    id: number;
    name: string;
    email: string;
    idNumber: string;
    address: string;
    phoneNumber: string;
}

export default function HomeScreen() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.id) {
                try {
                    const response = await fetch(`/api/auth?userId=${user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    } else {
                        console.error('Failed to fetch user data');
                        router.push('/');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    router.push('/');
                }
            } else {
                router.push('/');
            }
            setLoading(false);
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    const handleParking = () => {
        console.log("Parking clicked");
        router.push("/parking");
    };

    const handleDining = () => {
        console.log("Dining clicked");
        router.push("/dining/dining-page");
    };

    const handleID = () => {
        console.log("ID clicked");
        router.push("/id");
    };

    if (loading) {
        return (
            <div className="flex flex-col h-screen bg-gray-100">
                <header className="bg-red-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Home</h1>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </header>
                <main className="flex-grow p-4 space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-red-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Home</h1>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-6 w-6" />
                </Button>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {userData?.name.charAt(0)}
                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{userData?.name}</h2>
                                <p className="text-gray-600">{userData?.idNumber}</p>
                                <p className="text-sm text-gray-500">{userData?.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center"
                        onClick={handleID}
                    >
                        <CreditCard className="h-8 w-8 mb-2" />
                        <span>Student ID</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center"
                        onClick={handleDining}
                    >
                        <Utensils className="h-8 w-8 mb-2" />
                        <span>Dining</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center"
                        onClick={handleParking}
                    >
                        <Car className="h-8 w-8 mb-2" />
                        <span>Parking</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-32 flex flex-col items-center justify-center"
                        onClick={() => console.log("More options clicked")}
                    >
                        <span className="text-2xl mb-2">...</span>
                        <span>More</span>
                    </Button>
                </div>
            </main>
        </div>
    );
}