import ReviewsTable from "@/components/organisms/ReviewsTable";
import TitleDashboard from "@/components/organisms/TitleDashboard";
import { FC } from "react";

interface ReviewsProps {}

const Reviews: FC<ReviewsProps> = () => {
  return (
    <section className="space-y-4">
      <TitleDashboard
        title="Reviews"
        label="Add Reviews"
        link="/dashboard/add-review"
      />
      <ReviewsTable />
    </section>
  );
};

export default Reviews;
