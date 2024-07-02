import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { bookingListType } from "@/types";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([]);
  }

  const result = await prisma.reserved.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      Store: true,
    },
  });

  if (!result || result.length === 0) {
    return NextResponse.json([]);
  }

  const parseBooking = result.map((item: any) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    date: item.date,
    services: item.services,
    nameStore: item.Store.name,
    locationStore: item.Store.location,
    timeStore: `${item.Store.openTime} - ${item.Store.closeTime}`,
  })) as bookingListType[];

  return NextResponse.json(parseBooking);
}
