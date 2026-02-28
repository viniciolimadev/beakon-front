"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useAppToast } from "@/lib/toast";

const CONFETTI_COLORS = [
  "#3b82f6", "#22c55e", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#ec4899",
];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

function ConfettiOverlay() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
      size: 6 + Math.random() * 8,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AchievementUnlockToast() {
  const { lastAchievement } = useGamificationStore();
  const toast = useAppToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevAchievement, setPrevAchievement] = useState<string | null>(null);

  useEffect(() => {
    if (!lastAchievement) return;
    // Only trigger when a newly unlocked achievement appears
    const key = lastAchievement.id + (lastAchievement.unlockedAt ?? "");
    if (key === prevAchievement) return;
    setPrevAchievement(key);

    toast.achievement(lastAchievement.title, lastAchievement.xpReward);
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 2500);
    return () => clearTimeout(timer);
  }, [lastAchievement, prevAchievement, toast]);

  return showConfetti ? <ConfettiOverlay /> : null;
}
