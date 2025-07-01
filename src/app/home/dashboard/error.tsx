"use client";

import ErrorCard from "@/shared/components/error-card";
import { Button } from "@/shared/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ErrorCard title="Dashboard" error={error.message} />
      <Button
        onClick={reset}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reintentar
      </Button>
    </div>
  );
}
