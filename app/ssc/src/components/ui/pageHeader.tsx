import React from "react";
import { ArrowLeft, LogOutIcon } from "lucide-react";
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
  onBackClick,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-red-800 text-white p-4 flex items-center justify-between rounded-b-3xl">
      {isHomeScreen ? (
        <button onClick={onLogout} className="text-white">
          <LogOutIcon size={24} className="transform scale-x-[-1]" />
        </button>
      ) : (
        <button onClick={handleBackClick} className="text-white">
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold">{title.toUpperCase()}</h1>
      <div className="w-6"></div>
    </header>
  );
};

export default Header;
