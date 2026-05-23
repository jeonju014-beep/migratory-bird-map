"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  buildPhotoList,
  PHOTO_ROTATE_MS,
  type SpoonbillPhoto,
} from "@/lib/mock/spoonbill-photos";

export function SpoonbillPhotoRotator({
  apiPictureUrl,
}: {
  apiPictureUrl?: string;
}) {
  const photos = buildPhotoList(apiPictureUrl);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + photos.length) % photos.length);
    },
    [photos.length],
  );

  useEffect(() => {
    setFade(false);
    const fadeIn = window.setTimeout(() => setFade(true), 80);
    return () => window.clearTimeout(fadeIn);
  }, [index]);

  useEffect(() => {
    const rotateTimer = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, PHOTO_ROTATE_MS);

    return () => window.clearInterval(rotateTimer);
  }, [photos.length]);

  const current: SpoonbillPhoto = photos[index];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative mx-auto aspect-[21/9] max-h-36 w-full bg-bg">
        <Image
          key={current.id}
          src={current.url}
          alt={`댕기머리물떼새 - ${current.title}`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <Badge className="bg-white/20 px-1.5 py-0 text-[10px] text-white backdrop-blur-sm">
              <Camera className="mr-0.5 h-2.5 w-2.5" />
              {current.title}
            </Badge>
            <span className="rounded-md bg-black/30 px-1.5 py-0.5 text-[9px] backdrop-blur-sm">
              {index + 1}/{photos.length}
            </span>
          </div>
          <p className="line-clamp-1 text-xs font-semibold">{current.caption}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-border bg-bg px-2 py-1.5">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            aria-label={`${photo.title} 사진 보기`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand" : "w-2 bg-border hover:bg-brand/40"
            }`}
          />
        ))}
        <span className="ml-1 text-[9px] text-text-tertiary">1분마다 변경</span>
      </div>
    </div>
  );
}
