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
import { BOOKING_COLUMN } from "@/constants";
import { fetcher } from "@/lib/utils";
import { bookingListType } from "@/types";
import dayjs from "dayjs";
import { FC, useState } from "react";
import useSwr from "swr";
import PaginationSection from "../PaginationSection";
import { Separator } from "@/components/ui/separator";

interface BookingTableProps {}

const BookingTable: FC<BookingTableProps> = () => {
  const { data, isLoading, error } = useSwr<bookingListType[], Error>(
    "/api/booking-list",
    fetcher
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex) || [];

  if (isLoading) {
    return (
      <div className="mt-8">
        <Loading size={46} />
      </div>
    );
  }
  return (
    <>
      <Table className="border-primary-sea/20 mb-4 w-full mx-auto text-primary-sea border-y mt-8 ">
        <TableHeader>
          <TableRow>
            {BOOKING_COLUMN.map((item: string, i: number) => (
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
          {currentPosts?.map((item: bookingListType, i: number) => (
            <TableRow key={item.id || "" + i}>
              <TableCell className="w-2/12 align-top p-2">
                {item.name}
              </TableCell>
              <TableCell className="w-1/12 align-top p-2">
                {item.phone}
              </TableCell>
              <TableCell className="w-2/12 align-top p-2">
                {dayjs(item.date).format("dddd HH:mm, DD MMM YYYY")}
              </TableCell>
              <TableCell className="w-3/12 align-top p-2">
                <ul>
                  {item.services.map((data: string, i: number) => {
                    const service = data.split("|").at(0);
                    const duration = data.split("|").pop();
                    return (
                      <li key={data + i}>
                        -{service}, {duration} hour{" "}
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
              <TableCell className="w-5/12 align-top p-2">
                <div
                  className="grid"
                  style={{ gridTemplateColumns: "8rem 1fr" }}
                >
                  <p>Name Store</p>
                  <p>: {item.nameStore}</p>
                </div>
                <div
                  className="grid"
                  style={{ gridTemplateColumns: "8rem 1fr" }}
                >
                  <p>Time Store</p>
                  <p>: {item.timeStore}</p>
                </div>
                <div
                  className="grid"
                  style={{ gridTemplateColumns: "8rem 1fr" }}
                >
                  <p>Location Store</p>
                  <p>: {item.locationStore}</p>
                </div>
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
  );
};

export default BookingTable;
