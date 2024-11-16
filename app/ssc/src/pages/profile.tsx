import React from "react";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Label } from "@/components/ui/label";
import IdCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

interface ProfileData {
  name: string;
  idNumber: string;
  email: string;
  address: string;
  phoneNumber: string;
  photoUrl: string;
}

export default function ProfilePage() {
  const profileData: ProfileData = {
    name: "John Doe",
    idNumber: "#123456789",
    email: "johndoe@cofc.edu",
    address: "123 Sesame Street",
    phoneNumber: "(678) 999-8212",
    photoUrl: "/ssc-logo.png",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="My Profile" isHomeScreen={false} />

      <main className="flex-1 container max-w-2xl mx-auto p-4 space-y-6 pt-20 pb-24">
        <IdCard
          name={profileData.name}
          idNumber={profileData.idNumber}
          email={profileData.email}
          photoUrl={profileData.photoUrl}
        />

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="text-gray-400" size={16} />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="text-gray-400" size={16} />
                <span>{profileData.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="text-gray-400" size={16} />
                <span>{profileData.phoneNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={profileData.name}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={profileData.email}
                  className="bg-white"
                />
              </div>
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
              <Button className="w-full bg-[#841414] hover:bg-[#9a1818]">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}
