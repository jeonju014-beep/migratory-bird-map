import { NextResponse } from "next/server";
import { fetchAllWeather } from "@/lib/api/clients";
import { getMockDashboardData } from "@/lib/mock/data";

export async function GET() {
  try {
    const result = await fetchAllWeather();
    return NextResponse.json({ ...result, isMock: false });
  } catch {
    const mock = getMockDashboardData();
    return NextResponse.json({
      summary: mock.weather,
      trend: mock.weatherTrend,
      isMock: true,
      error: "API unavailable, using mock data",
    });
  }
}
