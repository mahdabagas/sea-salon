"use client";

import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRANCH_STORE_COLUMN, DATA_BRANCH_STORE } from "@/constants";
import { branchStoreType } from "@/types";
import useSwr from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/atoms/Loading";

interface StoreTableProps {}

const StoreTable: FC<StoreTableProps> = () => {
  const { data, isLoading, error } = useSwr<branchStoreType[], Error>(
    "/api/store",
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
            {BRANCH_STORE_COLUMN.map((item: string, i: number) => (
              <TableHead key={item + i}>{item}</TableHead>
            ))}
            {/* <TableHead>Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: branchStoreType, i: number) => (
            <TableRow key={item.id || "" + i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <ul>
                  {item.service.map((data: string, i: number) => (
                    <li key={data + i}>- {data}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>
                {item.openTime} - {item.closeTime}
              </TableCell>
              <TableCell>{item.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreTable;
