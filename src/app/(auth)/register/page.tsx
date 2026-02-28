"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { registerRequest } from "@/services/authService";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const { user, token } = await registerRequest(
        data.name,
        data.email,
        data.password
      );
      setUser(user, token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { message?: string };
      if (error?.message?.toLowerCase().includes("email")) {
        setServerError("Este e-mail já está cadastrado.");
      } else {
        setServerError("Erro ao criar conta. Tente novamente.");
      }
    }
  };

  return (
    <div className="w-full max-w-sm space-y-7 animate-fade-in-up">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Crie sua conta
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Comece sua jornada de foco com o Beakon
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nome
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            autoComplete="name"
            autoFocus
            error={!!errors.name}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs text-danger">
              <AlertCircle className="h-3 w-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            error={!!errors.email}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-danger">
              <AlertCircle className="h-3 w-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            error={!!errors.password}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="flex items-center gap-1 text-xs text-danger">
              <AlertCircle className="h-3 w-3" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirmar senha
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repita a senha"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-danger">
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="flex items-center gap-2 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={isSubmitting}
        >
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline underline-offset-4"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
