// readCsvAndSaveToDb.js
import House from "@/models/House";
import db from "@/models/db";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await db();
    let price: string | null | number = req.nextUrl.searchParams.get("price");
    price = price ? parseInt(price) : 0;

    const lowerPriceLimit = price - 5000;
    const upperPriceLimit = price + 5000;

    const houses = await House.find({
      price: { $gte: lowerPriceLimit, $lte: upperPriceLimit },
    });
    return NextResponse.json(houses);
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
export async function POST(req: NextRequest) {
  try {
    await db();
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
