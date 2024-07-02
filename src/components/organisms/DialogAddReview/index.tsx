"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { reviewUserFormSchema } from "@/lib/form.schem";
import { Textarea } from "@/components/ui/textarea";
import { reviewType } from "@/types";
import StarsRating from "@/components/atoms/StarsRating";
import useReviews from "@/hooks/useReviews";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/atoms/Loading";

interface DialogAddReviewProps {}

const DialogAddReview: FC<DialogAddReviewProps> = ({}) => {
  const { data: session } = useSession();
  const { mutate } = useReviews();

  const form = useForm<z.infer<typeof reviewUserFormSchema>>({
    resolver: zodResolver(reviewUserFormSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (val: z.infer<typeof reviewUserFormSchema>) => {
    setLoading(true);
    try {
      const body: reviewType = {
        name: session?.user?.name,
        rating: val.rating,
        review: val.review,
      };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        form.setValue("review", "");
        form.setValue("rating", 0);
        toast({
          title: "Success",
          description: "Create review success",
        });
        mutate();
        setLoading(false);
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(!open)}
          className="py-2 px-4 text-xs rounded-full cursor-pointer font-normal text-primary-sea hover:text-secondary-sea border-2 hover:bg-primary-sea border-primary-sea bg-secondary-sea tracking-wider"
        >
          Review us
        </div>
      </DialogTrigger>
      <DialogContent className="bg-secondary-sea text-primary-sea">
        <DialogHeader>
          <DialogTitle>Add your Review</DialogTitle>
          <DialogDescription>
            Fill the field to add your review
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary-sea">
                    Rating
                  </FormLabel>
                  <FormControl>
                    <StarsRating setField={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-primary-sea">
                    Review
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us your review about Sea Salon"
                      className="w-full h-24 bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/80"
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
              className="w-full bg-primary-sea hover:bg-primary-sea/80 text-secondary-sea "
            >
              {loading ? <Loading variant="secondary" /> : "Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddReview;
