"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import { useAppToast } from "@/lib/toast";

function playNotificationSound() {
  if (typeof window === "undefined") return;
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.6);
  } catch {
    // AudioContext not available (SSR or restricted browser)
  }
}

export function PomodoroTicker() {
  const { isRunning, timeRemaining, mode, tick, finish, startBreak, nextMode } =
    usePomodoroStore();
  const toast = useAppToast();
  const transitioningRef = useRef(false);

  // Tick every second
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [isRunning, tick]);

  // Handle end of period
  useEffect(() => {
    if (timeRemaining > 0 || !isRunning || transitioningRef.current) return;

    transitioningRef.current = true;
    playNotificationSound();

    if (mode === "focus") {
      finish(true).then(() => {
        startBreak();
        toast.success("Sessão concluída! Hora da pausa 🎉");
        transitioningRef.current = false;
      });
    } else {
      nextMode();
      toast.success("Pausa encerrada! Hora de focar 🍅");
      transitioningRef.current = false;
    }
  }, [timeRemaining, isRunning, mode, finish, startBreak, nextMode, toast]);

  // Update document title
  useEffect(() => {
    if (!isRunning && !usePomodoroStore.getState().isPaused) {
      document.title = "Beakon";
      return;
    }
    const mm = Math.floor(timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const ss = (timeRemaining % 60).toString().padStart(2, "0");
    const emoji = mode === "focus" ? "🍅" : "☕";
    document.title = `${emoji} ${mm}:${ss} — Beakon`;
  }, [timeRemaining, isRunning, mode]);

  return null;
}
