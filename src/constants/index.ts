import { branchStoreType, reviewType } from "@/types";

export const BRANCH_STORE_COLUMN: string[] = [
  "Name",
  "Services",
  "Open-Close Time",
  "Location",
];

export const REVIEW_COLUMN: string[] = ["Name", "Rating", "Review", "Image"];

export const BOOKING_COLUMN: string[] = [
  "Name",
  "Phone",
  "Date",
  "Service",
  "Branch Store",
];

export const DUMMY_SERVICE = [
  "Haircut and Styling",
  "Color Services",
  "Hair Treatments",
];

export const DATA_BRANCH_STORE: branchStoreType[] = [
  {
    id: "1",
    name: "Sea Salon 1",
    service: ["haircuts", "styling", "color", "treatments"],
    openTime: "07:00",
    closeTime: "19:00",
    location: "Kemang, Jakarta Selatan",
  },
  {
    id: "2",
    name: "Sea Salon 2",
    service: ["haircuts", "styling", "color", "treatments"],
    openTime: "07:00",
    closeTime: "20:00",
    location: "Mampang, Jakarta Selatan",
  },
  {
    id: "3",
    name: "Sea Salon 3",
    service: ["haircuts", "styling", "color", "treatments"],
    openTime: "07:00",
    closeTime: "21:00",
    location: "Kebayoran, Jakarta Selatan",
  },
];

export const DATA_REVIEW: reviewType[] = [
  {
    id: "1",
    name: "Marion",
    rating: 4,
    review:
      "Exceptional salon! Skilled staff, relaxing atmosphere. Left feeling rejuvenated with a perfect haircut. Highly recommend for top-notch service!",
    image: "/images/review-1.png",
  },
  {
    id: "2",
    name: "Laurel",
    rating: 5,
    review:
      "Amazing salon! Professional staff, relaxing ambiance. Left feeling refreshed with a perfect haircut. Highly recommend for excellent service and pampering!",
    image: "/images/review-3.png",
  },
  {
    id: "3",
    name: "Jennie",
    rating: 4,
    review:
      "Outstanding salon experience! Skilled stylists, friendly service. Left feeling fabulous with a perfect haircut. Highly recommended for relaxation!",
    image: "/images/review-2.png",
  },
];
