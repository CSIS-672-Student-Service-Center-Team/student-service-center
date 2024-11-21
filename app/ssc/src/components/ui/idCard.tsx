import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IdCardProps {
  name: string;
  idNumber: string;
  email: string;
  photoUrl: string;
}

const IdCard: React.FC<IdCardProps> = ({ name, idNumber, email, photoUrl }) => {
  return (
    <Card className="w-full overflow-hidden border-2 border-[#8B1A1A] drop-shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-red-800 to-red-900 p-4 flex items-center">
          <div className="relative w-24 h-24 mr-4">
            <Image
              src={photoUrl}
              alt="Student Photo"
              layout="fill"
              objectFit="cover"
              className="rounded-lg border-2 border-white shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-white text-xl font-bold mb-1">{name}</h2>
            <Badge variant="secondary" className="mb-1 w-fit text-xs">
              {idNumber}
            </Badge>
            <p className="text-red-100 text-xs">{email}</p>
          </div>
        </div>
        <div className="bg-white p-3">
          <p className="text-red-800 text-xs font-semibold mb-0.5">
            Student Services Center
          </p>
          <p className="text-gray-600 text-[10px]">
            Valid for the current academic year
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdCard;
