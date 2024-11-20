import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Label } from "@/components/ui/label";
import IdCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { currentUserId } from "@/lib/currentUser";

interface ProfileData {
  id: number;
  name: string;
  idNumber: string;
  email: string;
  address: string;
  phoneNumber: string;
  photoUrl: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users?userId=${currentUserId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData((prevData) => prevData ? { ...prevData, [id]: value } : null);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

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
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={profileData.name}
                  className="bg-white"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={profileData.email}
                  className="bg-white"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue={profileData.address}
                  className="bg-white"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  defaultValue={profileData.phoneNumber}
                  className="bg-white"
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full bg-[#841414] hover:bg-[#9a1818]">
                Save Changes
              </Button>
            </form>
            {showSuccessMessage && (
              <div className="mt-4 text-green-600">
                Profile updated successfully!
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <NavBar />
    </div>
  );
}