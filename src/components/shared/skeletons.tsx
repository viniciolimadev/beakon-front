import { cn } from "@/lib/utils";

/** Base skeleton with shimmer animation */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-surface-elevated relative overflow-hidden",
        "after:absolute after:inset-0 after:animate-shimmer",
        "after:bg-[linear-gradient(90deg,transparent_0%,hsl(var(--surface))_50%,transparent_100%)]",
        "after:bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}

export function RoutineItemSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-3">
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-7 rounded-full" />
          ))}
        </div>
      </div>
      <Skeleton className="h-5 w-9 rounded-full" />
    </div>
  );
}

export function GamificationWidgetSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function AchievementCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}
