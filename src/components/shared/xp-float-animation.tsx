"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

interface FloatingXP {
  id: number;
  amount: number;
}

/**
 * Renders floating "+N XP" text that animates upward and fades out
 * whenever addXP() is called in the gamification store.
 * Mount once in the dashboard layout.
 */
export function XpFloatAnimation() {
  const { lastXpGain, clearXpGain } = useGamificationStore();
  const [floats, setFloats] = useState<FloatingXP[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!lastXpGain) return;

    const id = ++counterRef.current;
    setFloats((prev) => [...prev, { id, amount: lastXpGain }]);
    clearXpGain();

    // Remove after animation completes (1.5s)
    const timer = setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, 1500);

    return () => clearTimeout(timer);
  }, [lastXpGain, clearXpGain]);

  if (floats.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 pointer-events-none space-y-1">
      {floats.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-1 text-sm font-semibold text-warning animate-[xp-float_1.5s_ease-out_forwards]"
          style={{
            animation: "xp-float 1.5s ease-out forwards",
          }}
        >
          <Zap className="h-3.5 w-3.5" />
          +{f.amount} XP
        </div>
      ))}
    </div>
  );
}
