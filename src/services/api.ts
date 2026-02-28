import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  validationErrors?: ValidationError[];
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request: injeta JWT no header Authorization
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: trata 401 e formata erros 422
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    if (status === 422) {
      const data = error.response?.data as Record<string, unknown>;
      const raw = (data?.errors ?? data?.messages ?? {}) as Record<
        string,
        string | string[]
      >;

      const validationErrors: ValidationError[] = Object.entries(raw).map(
        ([field, messages]) => ({
          field,
          message: Array.isArray(messages) ? messages[0] : messages,
        })
      );

      const apiError: ApiError = {
        status: 422,
        message: "Dados inválidos. Verifique os campos e tente novamente.",
        validationErrors,
      };

      return Promise.reject(apiError);
    }

    const apiError: ApiError = {
      status: status ?? 0,
      message:
        (error.response?.data as Record<string, string>)?.message ??
        error.message ??
        "Erro inesperado. Tente novamente.",
    };

    return Promise.reject(apiError);
  }
);

export default api;
