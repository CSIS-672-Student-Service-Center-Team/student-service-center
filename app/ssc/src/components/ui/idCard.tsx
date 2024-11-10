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
    <div className="id-card"> {/* Use the new CSS class */}
      <Image
        src="/id-logo.png"
        alt="Student Photo"
        width={120}
        height={120}
        className="rounded-full mr-4"
      />
      <div className="info"> {/* Use the new CSS class */}
        <p className="name">{name}</p> {/* Use the new CSS class */}
        <p>{idNumber}</p>
        <p>{email}</p>
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