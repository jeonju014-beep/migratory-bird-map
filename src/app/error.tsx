"use client";

import { Heart, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-violet-50 px-4">
      <div className="max-w-md rounded-3xl border border-rose-100 bg-white/80 p-8 text-center shadow-lg shadow-pink-100/50 backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
          <Heart className="h-7 w-7 text-pink-400" />
        </div>
        <h2 className="font-display text-lg font-bold text-rose-800">
          앗, 대시보드를 불러오지 못했어요
        </h2>
        <p className="mt-2 text-sm text-violet-500">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-violet-400 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-pink-200/50 hover:from-pink-500 hover:to-violet-500"
        >
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </button>
      </div>
    </div>
  );
}
