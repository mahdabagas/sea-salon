export type branchStoreType = {
  id: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  duration: number;
  service: string[];
};

export type reviewType = {
  id: string;
  name: string;
  rating: number;
  review: string;
  image: string;
};
