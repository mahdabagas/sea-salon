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
import { REVIEW_COLUMN } from "@/constants";
import { fetcher } from "@/lib/utils";
import { reviewType } from "@/types";
import Link from "next/link";
import { FC, useState } from "react";
import useSwr from "swr";
import PaginationSection from "../PaginationSection";
import { Separator } from "@/components/ui/separator";

interface ReviewsTableProps {}

const ReviewsTable: FC<ReviewsTableProps> = () => {
  const { data, isLoading, error } = useSwr<reviewType[], Error>(
    "/api/review",
    fetcher
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = error
    ? []
    : data?.slice(firstPostIndex, lastPostIndex) || [];
  const isEmpty = currentPosts.length === 0;

  if (isLoading) {
    return <Loading size={46} />;
  }

  return !isEmpty ? (
    <>
      <Table className="border-primary-sea/20 border-y">
        <TableHeader>
          <TableRow>
            {REVIEW_COLUMN.map((item: string, i: number) => (
              <TableHead
                key={item + i}
                className="text-primary-sea font-semibold p-2"
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="h-96">
          {currentPosts.map((item: reviewType, i: number) => (
            <TableRow key={item.id || "" + i}>
              <TableCell className="align-top p-2 w-1/6">{item.name}</TableCell>
              <TableCell className="align-top p-2 w-1/6">
                {item.rating}
              </TableCell>
              <TableCell className="align-top p-2 w-3/6">
                {item.review}
              </TableCell>
              <TableCell className="align-top p-2 w-2/6">
                <Link href={item.image || ""} target="_blank">
                  {item.image?.split("/public")[2]}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationSection
        totalPosts={data?.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  ) : (
    <>
      <Separator className="my-8 bg-primary-sea" />
      <p className="text-center text-lg text-primary-sea">
        Data Review is Empty
      </p>
    </>
  );
};

export default ReviewsTable;
