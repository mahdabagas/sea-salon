"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import TitleSection from "@/components/atoms/TitleSection";
import { reviewType } from "@/types";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/atoms/Loading";
import PaginationSection from "../PaginationSection";
import DialogAddReview from "../DialogAddReview";
import { useSession } from "next-auth/react";

const Review = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR<reviewType[], Error>(
    "/api/review",
    fetcher
  );

  const screenSize = useScreenSize();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex) || [];

  useEffect(() => {
    if (screenSize.width > 0 && screenSize.width < 640) {
      setPostsPerPage(1);
    } else if (screenSize.width > 640 && screenSize.width < 840) {
      setPostsPerPage(2);
    } else {
      setPostsPerPage(3);
    }
  }, [screenSize.width]);

  return (
    <section className="w-full bg-secondary-sea px-6 md:px-12 lg:px-20 pt-12 relative">
      <TitleSection title="Our Review" className="lg:text-end mb-8" />
      {session && (
        <div className="absolute z-10 top-[3.5rem] right-8 md:right-12 lg:top-[4rem] lg:right-[21rem]">
          <DialogAddReview />
        </div>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-center items-start gap-8 my-4">
            {currentPosts.map((data: reviewType, i: number) => (
              <div
                key={data.id || "" + i}
                className="text-primary-sea border w-80 border-primary-sea p-6 space-y-2"
              >
                <Image
                  alt={data.image}
                  src={data.image}
                  width={1200}
                  height={1200}
                  className="object-cover w-full h-full"
                />
                <h1>{data.name}</h1>
                <div>{data.rating}</div>
                <p className="line-clamp-3">{data.review}</p>
              </div>
            ))}
          </div>
          <PaginationSection
            totalPosts={data?.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </section>
  );
};

export default Review;
