import { NextRequest, NextResponse } from "next/server";
import { getDashboardData } from "@/lib/api/dashboard";

export async function GET(request: NextRequest) {
  const areaCode = request.nextUrl.searchParams.get("areaCode") ?? "0";

  try {
    const data = await getDashboardData(areaCode);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
