import { Card, CardContent } from "../ui/card";
import exampleImage from "../../assets/example_image.png";

interface WorkoutCardProps {
  text: string;
  imageUrl: string;
  handleClick: () => void;
}

export default function WorkoutCard({
  text,
  imageUrl,
  handleClick,
}: WorkoutCardProps) {
  return (
    <Card
      onClick={handleClick}
      className="w-72 shadow-lg hover:scale-105 transition-transform"
    >
      <CardContent className="p-4 flex flex-col items-center">
        <img
          // src={imageUrl}
          src={exampleImage}
          alt={imageUrl}
          className="w-full h-48 object-cover rounded"
        />
        <p className="mt-4 font-semibold text-lg">{text}</p>
      </CardContent>
    </Card>
  );
}
