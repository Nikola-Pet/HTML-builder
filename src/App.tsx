import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { EmailBuilderProvider } from "./contexts/EmailBuilderContext";
import AppRoutes from "./routes/AppRoutes";
import SideNav from "./layout/SideNav/SideNav";
import { Breadcrumb, BreadcrumbsContext } from "./contexts/breadcrumbsContext";
import { useState } from "react";
import Header from "./layout/Header/Header";
import '@/styles/frontend-kit.complete.css';


const queryClient = new QueryClient();

const App = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  return (
  <QueryClientProvider client={queryClient}>
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
    <EmailBuilderProvider>
      <TooltipProvider>
        <div className="o-header"></div>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div style={{ display: "flex" }}>
            <SideNav />
            <main style={{ flex: 1, overflow: "auto" }}>
             <Header />
              <AppRoutes />
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </EmailBuilderProvider>
    </BreadcrumbsContext.Provider>
  </QueryClientProvider>
  )
};

export default App;
