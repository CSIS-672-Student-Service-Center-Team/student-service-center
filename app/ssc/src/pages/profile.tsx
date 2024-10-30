import React from 'react'
import { Input } from "@/components/ui/input"
import Header from "@/components/ui/Header"
import BottomNavBar from "@/components/ui/BottomNavBar"
import { Label } from "@/components/ui/label"
import StudentIDCard from "@/components/ui/StudentIDCard";

interface ProfileData {
    name: string
    idNumber: string
    email: string
    address: string
    phoneNumber: string
    photoUrl: string
}

export default function Component() {
    const profileData: ProfileData = {
        name: "John Doe",
        idNumber: "#123456789",
        email: "johndoe@cofc.edu",
        address: "123 Sesame Street",
        phoneNumber: "(678) 999-8212",
        photoUrl: "/placeholder.svg"
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header title="My Profile" isHomeScreen={false} />

            <main className="flex-1 p-4 space-y-6 pt-16">
                {/* Profile Card */}
                <StudentIDCard
                    name="John Doe"
                    idNumber="#123456789"
                    email="johndoe@cofc.edu"
                    photoUrl="/ssc-logo.png"
                />
                {/* Profile Form */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            defaultValue={profileData.address}
                            className="bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            defaultValue={profileData.phoneNumber}
                            className="bg-white"
                        />
                    </div>
                </div>
            </main>

            <BottomNavBar />
        </div>
    )
}