import React from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  isHomeScreen?: boolean;
  onLogout?: () => void;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isHomeScreen = false,
  onLogout,
  onBackClick
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    // if we have this argument
    if (onBackClick) {
      onBackClick(); // Use the behavior
    } else {
      router.back(); // Navigate to home screen
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-red-800 text-white p-4 flex items-center justify-between rounded-b-3xl">
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
