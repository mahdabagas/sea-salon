"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import TitleSection from "@/components/atoms/TitleSection";
import { DATA_REVIEW } from "@/constants";
import { reviewType } from "@/types";

interface ReviewProps {}

const Review: FC<ReviewProps> = () => {
  const screenSize = useScreenSize();
  const [data, setDate] = useState(DATA_REVIEW);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

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
    <section className="w-full bg-secondary-sea px-6 md:px-12 lg:px-20 pt-12">
      <TitleSection title="Our Review" className="lg:text-end mb-8" />
      <div className="flex justify-center items-start gap-8 my-4">
        {currentPosts.map((data: reviewType, i: number) => (
          <div
            key={data.id + i}
            className="text-primary-sea border w-80 border-primary-sea p-6 space-y-2"
          >
            <Image
              alt={data.image}
              src={data.image}
              width={1200}
              height={1200}
              className="w-72 h-72"
            />
            <h1>{data.name}</h1>
            <div>{data.rating}</div>
            <p className="line-clamp-3">{data.review}</p>
          </div>
        ))}
      </div>
      <PaginationSection
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 3;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-primary-sea/25 rounded-md" : ""}
      >
        <PaginationLink
          onClick={() => setCurrentPage(page)}
          className="hover:bg-primary-sea/25 cursor-pointer hover:text-primary-sea"
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="text-primary-sea">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevPage}
              className="hover:bg-primary-sea/25 hover:text-primary-sea"
            />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className="hover:bg-primary-sea/25 *:hover:text-primary-sea"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Review;
