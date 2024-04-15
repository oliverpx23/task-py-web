import { NextUIProvider } from "@nextui-org/react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";


export const RootLayout = () => {
    
  const { pathname } = useLocation();
  const navigate = useNavigate();


  if (pathname === "/") {
    return <Navigate to="/app/boards" />;
  }

  return (
    <NextUIProvider navigate={navigate}>
      <section className="dark text-foreground bg-background">
        <Outlet />
      </section>
    </NextUIProvider>
  );
};
