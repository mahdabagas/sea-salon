import { fetcher } from "@/lib/utils";
import { reviewType } from "@/types";
import useSWR from "swr";

const useReviews = () => {
  const { data, isLoading, error, mutate } = useSWR<reviewType[], Error>(
    "/api/review",
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useReviews;
