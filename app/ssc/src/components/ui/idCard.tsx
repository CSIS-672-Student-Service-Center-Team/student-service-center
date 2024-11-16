import React from "react";
import Image from "next/image";

interface IdCardProps {
  name: string;
  idNumber: string;
  email: string;
  photoUrl: string;
}

const IdCard: React.FC<IdCardProps> = ({ name, idNumber, email, photoUrl }) => {
  return (
    <div className="bg-red-800 p-4 rounded-2xl flex items-center w-full h-[190px]">
      <Image
        src={photoUrl}
        alt="Student Photo"
        width={120}
        height={120}
        className="rounded-full mr-4"
      />
      <div className="flex flex-col justify-center">
        <p className="text-white text-xl font-semibold">{name}</p>
        <p className="text-white">{idNumber}</p>
        <p className="text-white">{email}</p>
      </div>
    </div>
  );
};

export default IdCard;

// Note: This component currently uses placeholder data.
// In the future, it will display the logged-in user's actual information:
// - name
// - ID number
// - email
// - student ID photo
// Remove the placeholder data when implementing the actual user data fetching logic.
