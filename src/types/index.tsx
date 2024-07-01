export type branchStoreType = {
  id?: string;
  name: string;
  location: string;
  openTime: string;
  closeTime: string;
  service: string[];
};

export type reviewType = {
  id?: string;
  name: string;
  rating: number;
  review: string;
  image: string;
};

export type bookingType = {
  id?: string;
  name: string;
  phone: string;
  date: Date;
  services: string[];
  userId: string;
  storeId: string;
};
