import ReviewForm from "@/components/forms/ReviewForm";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface AddReviewProps {}

const AddReview: FC<AddReviewProps> = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Review Additon Form</h1>
      <h2>Add a Review</h2>

      <Separator className="my-4" />

      <ReviewForm />
    </div>
  );
};

export default AddReview;
