interface ParkingPassProps {
  type: string;
  status: string;
  expirationDate: string;
}

const ParkingPass: React.FC<ParkingPassProps> = ({
  type,
  status,
  expirationDate,
}) => (
  <p className="mb-4 text-lg">
    {type} ({status}) Expiration: {expirationDate}
  </p>
);

export default ParkingPass;
