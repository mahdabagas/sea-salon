"use client";

import Loading from "@/components/atoms/Loading";
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
import { useToast } from "@/components/ui/use-toast";
import { signUpFormSchema } from "@/lib/form.schem";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(val),
      }).then(() => {
        toast({
          title: "Success",
          description: "Create account success",
        });
        setLoading(false);
        router.push("/signin");
      });
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
                  className="bg-secondary-sea border-primary-sea text-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/80"
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
                  className="bg-secondary-sea border-primary-sea text-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/80"
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
                  className="bg-secondary-sea border-primary-sea text-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-primary-sea text-secondary-sea hover:bg-primary-sea/80"
        >
          {loading ? <Loading variant="secondary" /> : "Sign Up"}
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
