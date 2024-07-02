import { Loader2Icon } from "lucide-react";
import { FC } from "react";

interface LoadingProps {
  size?: number;
  variant?: "primary" | "secondary";
}

const Loading: FC<LoadingProps> = ({ size = 20, variant = "primary" }) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2Icon
        size={size}
        className={`animate-spin text-${variant}-sea block `}
      />
    </div>
  );
};

export default Loading;
