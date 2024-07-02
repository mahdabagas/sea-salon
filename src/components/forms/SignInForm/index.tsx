"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/form.schem";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/atoms/Loading";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    setLoading(true);
    try {
      const authenticated = await signIn("credentials", {
        ...val,
        redirect: false,
      });

      if (authenticated?.error) {
        toast({
          title: "Error",
          description: "Email or password maybe wrong",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success",
        description: "Succes Login",
      });

      await setLoading(false);
      await router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Please try again",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-sea">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  className="bg-secondary-sea border-primary-sea text-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-sea">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your pasword"
                  className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-sea text-secondary-sea hover:bg-primary-sea/80"
        >
          {loading ? <Loading variant="secondary" /> : "Sign In"}
        </Button>
        <div className="text-primary-sea/80 text-sm mt-6">
          <p className="inline-flex">Dont`t have an account</p>{" "}
          <Link href="/signup" className="text-primary-sea font-semibold">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
