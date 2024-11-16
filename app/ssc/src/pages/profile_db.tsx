import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/pageHeader";
import NavBar from "@/components/ui/navBar";
import { Label } from "@/components/ui/label";
import IdCard from "@/components/ui/idCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from 'lucide-react';
import { currentUserId } from "@/lib/currentUser";

interface ProfileData {
  id: number;
  name: string;
  id_number: string;
  email: string;
  address: string;
  phone_number: string;
  photo_url: string;
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<ProfileData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users_db?userId=${currentUserId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setEditedData(data);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        setError("An error occurred while fetching profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users_db?userId=${currentUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(updatedData);
        setIsEditing(false);
      } else {
        setError("Failed to update profile data");
      }
    } catch (error) {
      setError("An error occurred while updating profile data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data found</div>;
  }

  return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="My Profile" isHomeScreen={false} />

        <main className="flex-1 container max-w-2xl mx-auto p-4 space-y-6 pt-20 pb-24">
          <IdCard
              name={profileData.name}
              idNumber={profileData.id_number}
              email={profileData.email}
              photoUrl={profileData.photo_url}
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
                  <span>{profileData.phone_number}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Profile" : "Profile Details"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                      id="name"
                      name="name"
                      value={isEditing ? editedData.name : profileData.name}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      value={isEditing ? editedData.email : profileData.email}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                      id="address"
                      name="address"
                      value={isEditing ? editedData.address : profileData.address}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                      id="phone_number"
                      name="phone_number"
                      value={isEditing ? editedData.phone_number : profileData.phone_number}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="bg-white"
                  />
                </div>
                {isEditing ? (
                    <div className="flex space-x-2">
                      <Button type="submit" className="w-full bg-[#841414] hover:bg-[#9a1818]">
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                        Cancel
                      </Button>
                    </div>
                ) : (
                    <Button type="button" onClick={() => setIsEditing(true)} className="w-full bg-[#841414] hover:bg-[#9a1818]">
                      Edit Profile
                    </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </main>

        <NavBar />
      </div>
  );
}