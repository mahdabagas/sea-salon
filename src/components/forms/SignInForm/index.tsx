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
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    console.log(val);
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
          Sign In
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
