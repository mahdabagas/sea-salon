import { Loader2Icon } from "lucide-react";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2Icon className="animate-spin text-primary-sea block w-12 h-12" />
    </div>
  );
};

export default Loading;
