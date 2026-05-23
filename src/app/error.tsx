"use client";

import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">
          대시보드를 불러오지 못했습니다
        </h2>
        <p className="mt-2 text-sm text-slate-500">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
