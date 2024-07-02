"use client";

import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRANCH_STORE_COLUMN } from "@/constants";
import { branchStoreType } from "@/types";
import useSwr from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/atoms/Loading";
import PaginationSection from "../PaginationSection";
import { Separator } from "@/components/ui/separator";

interface StoreTableProps {}

const StoreTable: FC<StoreTableProps> = () => {
  const { data, isLoading, error } = useSwr<branchStoreType[], Error>(
    "/api/store",
    fetcher
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

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
            {BRANCH_STORE_COLUMN.map((item: string, i: number) => (
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
          {currentPosts.map((item: branchStoreType, i: number) => (
            <TableRow key={item.id || "" + i}>
              <TableCell className="align-top p-2 w-1/6">{item.name}</TableCell>
              <TableCell className="align-top p-2 w-3/6">
                <ul>
                  {item.service.map((data: string, i: number) => {
                    const service = data.split("|").at(0);
                    const duration = data.split("|").pop();
                    return (
                      <li key={data + i}>
                        - {service}, {duration} hour{" "}
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
              <TableCell className="align-top p-2 w-2/6">
                {item.openTime} - {item.closeTime}
              </TableCell>
              <TableCell className="align-top p-2 w-3/6">
                {item.location}
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
        Data Store is Empty
      </p>
    </>
  );
};

export default StoreTable;
