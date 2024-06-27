"use client";

import FieldInput from "@/components/organisms/FieldInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema } from "@/lib/form.schem";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ReviewFormProps {}

const ReviewForm: FC<ReviewFormProps> = () => {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
  });

  const onSubmit = (val: z.infer<typeof reviewFormSchema>) => {
    console.log(val);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <FieldInput title="Name" subtitle="Your Full Name">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="eg. Bagas Mahda"
                    {...field}
                    className="w-[360px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Rating" subtitle="Star Rating (1-5)">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="eg. 2"
                    {...field}
                    className="w-[360px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Review" subtitle="Detailed Feedback">
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your review about Sea Salon"
                    className="w-[360px] h-48"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Image" subtitle="Upload a Photo">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    className="w-[360px]"
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </FormControl>
                <FormDescription>File size max. 2MB</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <div className="flex justify-end items-center">
          <Button
            size="lg"
            className="bg-primary-sea text-secondary-sea font-semibold  "
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
