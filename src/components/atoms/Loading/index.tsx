import { Loader2Icon } from "lucide-react";
import { FC } from "react";

interface LoadingProps {
  size?: string;
}

const Loading: FC<LoadingProps> = ({ size = "12" }) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2Icon
        className={`animate-spin text-primary-sea block w-${size} h-${size}`}
      />
    </div>
  );
};

export default Loading;
