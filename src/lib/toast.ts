import { useToast } from "@/hooks/use-toast";

export function useAppToast() {
  const { toast } = useToast();

  return {
    success: (title: string, description?: string) =>
      toast({ title, description }),

    error: (title: string, description?: string) =>
      toast({ title, description, variant: "destructive" }),

    xp: (amount: number) =>
      toast({
        title: `+${amount} XP`,
        description: "Tarefa concluída!",
      }),

    achievement: (title: string, xpReward: number) =>
      toast({
        title: `Conquista: ${title}`,
        description: `+${xpReward} XP bônus`,
      }),
  };
}
