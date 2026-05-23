"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/format";
import { normalizeExternalUrl } from "@/lib/utils/map-url";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallback?: React.ReactNode;
}

export function SafeImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallback = (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-50 to-violet-50 text-3xl">
      🐦
    </div>
  ),
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const normalizedSrc = normalizeExternalUrl(src);

  if (failed) {
    return <div className={wrapperClassName}>{fallback}</div>;
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={normalizedSrc}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
