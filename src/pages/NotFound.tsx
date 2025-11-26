import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

 return (
    <div className="flex min-h-screen items-center justify-center -secondary">
        <div className="a-text text-center">
          <h1 className="text-8xl font-bold"><strong>404</strong></h1>
          <p>
            Page not found
          </p>
          <Button variant="secondary" className="mt-4">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
  );
};

export default NotFound;
