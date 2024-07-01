import { Star } from "lucide-react";
import { FC, useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_UNSELECTED_COLOR = "#FFFBF6";
const DEFAULT_COLOR = "#028090";

interface StarsRatingProps {
  count?: number;
  defaultRating?: number;
  color?: string;
  setField: any;
}

const StarsRating: FC<StarsRatingProps> = ({
  count,
  defaultRating,
  color,
  setField,
}) => {
  const [rating, setRating] = useState(defaultRating || 0);
  const [temporaryRating, setTemporaryRating] = useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(<Star />);

  const handleClick = (rating: number) => {
    setRating(rating);
    setField(rating);
  };

  return (
    <div className="flex gap-2 items-center">
      {stars.map((item, index) => {
        const isActiveColor =
          (rating || temporaryRating) &&
          (index < rating || index < temporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            className="cursor-pointer "
            key={index}
            onMouseEnter={() => setTemporaryRating(index + 1)}
            onMouseLeave={() => setTemporaryRating(0)}
            onClick={() => handleClick(index + 1)}
          >
            <Star fill={elementColor} className="stroke-primary-sea stroke-1" />
          </div>
        );
      })}
    </div>
  );
};

export default StarsRating;
