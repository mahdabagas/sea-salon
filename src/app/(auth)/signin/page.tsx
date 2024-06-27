import LogoTextSea from "@/components/atoms/LogoTextSea";
import SignInForm from "@/components/forms/SignInForm";
import { FC } from "react";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <div className="border-2 bg-secondary-sea border-primary-sea p-8 rounded-md w-96">
      <LogoTextSea className="text-2xl text-center lg:hidden mb-4" />
      <div className="text-3xl text-center font-semibold mb-4 text-primary-sea">
        Welcome Back, Dude
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
