"use client";

import Loading from "@/components/atoms/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA_REVIEW, REVIEW_COLUMN } from "@/constants";
import { fetcher } from "@/lib/utils";
import { reviewType } from "@/types";
import { FC } from "react";
import useSwr from "swr";

interface ReviewsTableProps {}

const ReviewsTable: FC<ReviewsTableProps> = () => {
  const { data, isLoading, error } = useSwr<reviewType[], Error>(
    "/api/review",
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }
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
          {data?.map((item: reviewType, i: number) => (
            <TableRow key={item.id || "" + i}>
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
