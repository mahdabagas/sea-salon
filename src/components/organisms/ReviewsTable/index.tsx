import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA_REVIEW, REVIEW_COLUMN } from "@/constants";
import { reviewType } from "@/types";
import { FC } from "react";

interface ReviewsTableProps {}

const ReviewsTable: FC<ReviewsTableProps> = () => {
  return (
    <div className="border">
      <Table>
        <TableHeader>
          <TableRow>
            {REVIEW_COLUMN.map((item: string, i: number) => (
              <TableHead key={item + i}>{item}</TableHead>
            ))}
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATA_REVIEW.map((item: reviewType, i: number) => (
            <TableRow key={item.id + i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.rating}</TableCell>
              <TableCell className="max-w-96">{item.review}</TableCell>
              <TableCell>{item.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewsTable;
