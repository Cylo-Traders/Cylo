import { FC } from "react";
import { FaStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, index) => (
        <FaStar
          key={index}
          className={`size-4 ${index < rating ? "text-[#FCCD29]" : "text-black/15"}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
