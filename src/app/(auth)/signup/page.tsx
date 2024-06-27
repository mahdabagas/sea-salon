import LogoTextSea from "@/components/atoms/LogoTextSea";
import SignUpForm from "@/components/forms/SignUpForm";
import { FC } from "react";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <div className="border-2 bg-secondary-sea border-primary-sea p-8 rounded-md w-96">
      <LogoTextSea className="text-2xl text-center lg:hidden mb-4" />
      <div className="text-3xl text-center font-semibold mb-4 text-primary-sea">
        Get more Services
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
