import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useThemeStore } from "./store/themeStore";
import NotFound from "./pages/NotFound";

const Todos = lazy(() => import("./pages/Todos"));
const Notes = lazy(() => import("./pages/Notes"));
const Wiki = lazy(() => import("./pages/Wiki"));

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/todos" element={<MainLayout><Todos /></MainLayout>} />
              <Route path="/notes" element={<MainLayout><Notes /></MainLayout>} />
              <Route path="/wiki" element={<MainLayout><Wiki /></MainLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
