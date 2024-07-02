"use client";

import Loading from "@/components/atoms/Loading";
import StarsRating from "@/components/atoms/StarsRating";
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
import { useToast } from "@/components/ui/use-toast";
import { reviewFormSchema } from "@/lib/form.schem";
import { supabaseUploadFile } from "@/lib/supabase";
import { reviewType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ReviewFormProps {}

const ReviewForm: FC<ReviewFormProps> = () => {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (val: z.infer<typeof reviewFormSchema>) => {
    setLoading(true);
    try {
      let image;

      if (!val.image) {
        image = await supabaseUploadFile(val.image, "reviews");
      }
      if (image?.error) {
        throw "Error";
      }
      const body: reviewType = {
        name: val.name,
        rating: val.rating,
        review: val.review,
        image: val.image ? image?.imageName : null,
      };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        setLoading(false);
        toast({
          title: "Success",
          description: "Create review success",
        });
        router.push("/dashboard/reviews");
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Please try again",
      });
    }
  };

  console.log(form.getValues());
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
                    className="w-[360px] bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
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
                  <StarsRating setField={field.onChange} />
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
                    className="w-[360px] h-48 bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>

        <FieldInput title="Image" subtitle="Upload a Photo (optional)">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    onChange={(event) =>
                      field.onChange(
                        event.target.files && event.target.files[0]
                      )
                    }
                    type="file"
                    className="w-[360px] bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-sea placeholder:text-primary-sea/80 cursor-pointer"
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
            disabled={loading}
            className="bg-primary-sea text-secondary-sea font-semibold w-44 hover:bg-primary-sea/80"
          >
            {loading ? <Loading variant="secondary" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
