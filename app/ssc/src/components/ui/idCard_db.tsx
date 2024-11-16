import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { currentUserId } from "@/lib/currentUser";

interface UserData {
    id: number;
    name: string;
    id_number: string;
    email: string;
    photo_url: string;
    address: string;
    phone_number: string;
}

const IdCard_db: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data for ID:', currentUserId);
                const response = await fetch(`/api/users?userId=${currentUserId}`);
                console.log('Response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Received data:', data);
                    setUserData(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data. Please check the console for details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!userData) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-6">
                    <div className="text-center">
                        No user data found
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <Image
                        src={userData.photo_url}
                        alt="Student Photo"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">{userData.name}</h2>
                        <p className="text-sm text-gray-500">{userData.id_number}</p>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default IdCard_db;