"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/select";
import { REGIONS } from "@/lib/constants";

export function RegionFilter({ currentCode }: { currentCode: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRegionChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "0") {
      params.delete("region");
    } else {
      params.set("region", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={currentCode}
      onChange={handleRegionChange}
      options={REGIONS.map((region) => ({
        value: region.code,
        label: region.name,
      }))}
    />
  );
}
