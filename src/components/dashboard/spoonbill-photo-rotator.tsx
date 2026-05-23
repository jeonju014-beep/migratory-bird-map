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
    <div className="overflow-hidden rounded-2xl border border-rose-200/80 bg-white/70 shadow-md shadow-pink-100/40 ring-1 ring-pink-100">
      <div className="relative aspect-[16/9] max-h-56 w-full bg-gradient-to-br from-pink-50 to-violet-50 sm:max-h-64">
        <Image
          key={current.id}
          src={current.url}
          alt={`댕기머리물떼새 - ${current.title}`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 900px"
          unoptimized
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="love" className="bg-white/20 text-white backdrop-blur-sm">
              <Camera className="mr-1 h-3 w-3" />
              {current.title}
            </Badge>
            <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] backdrop-blur-sm">
              {index + 1} / {photos.length}
            </span>
          </div>
          <p className="font-display text-sm font-semibold sm:text-base">
            {current.caption}
          </p>
          <p className="mt-0.5 text-[10px] opacity-80">{current.credit}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 bg-rose-50/80 px-3 py-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            aria-label={`${photo.title} 사진 보기`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? "w-8 bg-pink-400"
                : "w-2.5 bg-pink-200 hover:bg-pink-300"
            }`}
          />
        ))}
        <span className="ml-2 text-[10px] text-text-tertiary">1분마다 자동 변경</span>
      </div>
    </div>
  );
}
