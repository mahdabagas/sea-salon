import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { supabasePublicUrl } from "@/lib/supabase";

export async function POST(request: Request) {
  const data = await request.json();

  const result = await prisma.review.create({
    data,
  });

  return NextResponse.json(result);
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany();

    if (!reviews || reviews.length === 0) {
      return NextResponse.json([]);
    }

    const parseReviews = await Promise.all(
      reviews.map(async (review) => {
        const imageName = review.image;
        const imageUrl = imageName
          ? await supabasePublicUrl(imageName, "reviews")
          : "/images/icon-user.png";

        return { ...review, image: imageUrl };
      })
    );

    return NextResponse.json(parseReviews);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
