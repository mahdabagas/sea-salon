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
import { PlusIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import StarsRating from "@/components/atoms/StarsRating";

interface DialogAddReviewProps {}

const DialogAddReview: FC<DialogAddReviewProps> = ({}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof reviewUserFormSchema>>({
    resolver: zodResolver(reviewUserFormSchema),
  });

  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof reviewUserFormSchema>) => {
    try {
      const body: reviewType = {
        name: session?.user.name,
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
        setOpen(false);
      });
    } catch (error) {
      console.log(error);
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
            Fill the field to add new review
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
                      className="w-full h-24 bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-primary-sea/40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary-sea hover:bg-primary-sea/80 text-secondary-sea "
            >
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddReview;
