import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface PaginationSectionProps {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}

const PaginationSection: FC<PaginationSectionProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
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
};

export default PaginationSection;
