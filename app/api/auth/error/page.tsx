"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mt-4">Reason: {error || "Unknown error"}</p>
      </div>
    </div>
  );
}
