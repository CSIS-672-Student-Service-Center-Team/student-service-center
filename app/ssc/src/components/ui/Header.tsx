import React from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  isHomeScreen?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isHomeScreen = false,
  onLogout,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/"); // Navigate to home screen
  };

  return (
    <header className="bg-red-800 text-white p-4 flex items-center justify-between rounded-b-3xl">
      {isHomeScreen ? (
        <button onClick={onLogout} className="text-white">
          <LogOut size={24} />
        </button>
      ) : (
        <button onClick={handleBackClick} className="text-white">
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="w-6"></div> {/* Spacer for alignment */}
    </header>
  );
};

export default Header;