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
import { signUpFormSchema } from "@/lib/form.schem";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(val),
      });

      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-sea">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...field}
                  className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary-sea">
                Phone number
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your number"
                  {...field}
                  className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  className="bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary-sea text-secondary-sea hover:bg-primary-sea/80"
        >
          Sign Up
        </Button>
        <div className="text-primary-sea/90 text-sm mt-6">
          <p className="inline-flex">Already have an account</p>{" "}
          <Link href="/signin" className="text-primary-sea font-semibold">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
