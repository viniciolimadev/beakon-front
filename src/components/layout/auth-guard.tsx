"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { logoutRequest } from "@/services/authService";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Zustand persist hydration is asynchronous. 
        // We only evaluate auth status after the component has mounted and hydrated.
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            // The user is not authenticated according to our frontend state.
            // E.g., they cleared local storage or the token expired but the Next.js HttpOnly cookie stuck around.
            // We must explicitly hit the logout endpoint to instruct Next.js to destroy the ghost cookie.
            logoutRequest().finally(() => {
                router.push("/login");
            });
        }
    }, [isHydrated, isAuthenticated, router]);

    if (!isHydrated || !isAuthenticated) {
        // Show a blank/loading screen while verifying so unauthorized users don't see the layout flash
        return (
            <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
