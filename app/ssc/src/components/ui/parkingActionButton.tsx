interface ParkingActionButtonProps {
  label: string;
  onClick: () => void;
}

const ParkingActionButton: React.FC<ParkingActionButtonProps> = ({
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full bg-white text-black text-xl font-normal py-4 px-8 rounded-full border-2 border-black shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 active:scale-95 mb-4"
  >
    {label}
  </button>
);

export default ParkingActionButton;
