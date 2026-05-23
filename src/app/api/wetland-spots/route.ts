import { NextRequest, NextResponse } from "next/server";
import { fetchWetlandSpots } from "@/lib/api/clients";
import { REGIONS } from "@/lib/constants";
import { getMockDashboardData } from "@/lib/mock/data";

export async function GET(request: NextRequest) {
  const areaCode = request.nextUrl.searchParams.get("areaCode") ?? "0";
  const region = REGIONS.find((r) => r.code === areaCode);

  try {
    const riverCode = region && "riverCode" in region ? region.riverCode : undefined;
    const result = await fetchWetlandSpots(riverCode);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({
      data: getMockDashboardData(areaCode).wetlandSpots,
      isMock: true,
      error: "API unavailable, using mock data",
    });
  }
}
