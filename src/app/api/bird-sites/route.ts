import { NextRequest, NextResponse } from "next/server";
import { fetchBirdSites } from "@/lib/api/clients";
import { getMockDashboardData } from "@/lib/mock/data";

export async function GET(request: NextRequest) {
  const areaCode = request.nextUrl.searchParams.get("areaCode") ?? "0";

  try {
    const result = await fetchBirdSites(areaCode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      data: getMockDashboardData(areaCode).birdSites,
      isMock: true,
      error: "API unavailable, using mock data",
    });
  }
}
