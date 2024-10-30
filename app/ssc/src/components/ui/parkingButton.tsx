"use client";

interface ParkingButtonProps {
  label: string;
  onClick: () => void;
}

const ParkingButton: React.FC<ParkingButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white text-black text-xl font-normal py-4 px-8 rounded-full border-2 border-black shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95"
  >
    {label}
  </button>
);

export default ParkingButton;
