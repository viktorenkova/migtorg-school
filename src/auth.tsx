import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { api, type AuthPayload, type ProgressSummary, type User } from "./api";

type AuthContextValue = {
  user: User | null;
  progress: ProgressSummary | null;
  isLoading: boolean;
  login: (payload: Pick<AuthPayload, "email" | "password">) => Promise<void>;
  register: (payload: Required<AuthPayload>) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const response = await api.me();
      setUser(response.user);
      setProgress(response.progress);
    } catch {
      setUser(null);
      setProgress(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.startsWith("/learn")) {
      void refresh();
      return;
    }

    setIsLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      progress,
      isLoading,
      refresh,
      login: async (payload) => {
        const response = await api.login(payload);
        setUser(response.user);
        setProgress(response.progress);
      },
      register: async (payload) => {
        const response = await api.register(payload);
        setUser(response.user);
        setProgress(response.progress);
      },
      logout: async () => {
        await api.logout();
        setUser(null);
        setProgress(null);
      }
    }),
    [isLoading, progress, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}
