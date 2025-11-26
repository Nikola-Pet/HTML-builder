import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Dashboard from "../pages/Dashboard";
import EmailBuilder from "../pages/EmailBuilder";
import { BriefingPage } from "../pages/BriefingPage";
import NotFound from "../pages/NotFound";

const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Something went wrong.</div>}
      key={location.pathname}
    >
      {children}
    </ErrorBoundary>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundaryWrapper>
            <Dashboard />
          </ErrorBoundaryWrapper>
        }
      />
      <Route
        path="/builder"
        element={
          <ErrorBoundaryWrapper>
            <EmailBuilder />
          </ErrorBoundaryWrapper>
        }
      />
      <Route
        path="/briefing"
        element={
          <ErrorBoundaryWrapper>
            <BriefingPage />
          </ErrorBoundaryWrapper>
        }
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
