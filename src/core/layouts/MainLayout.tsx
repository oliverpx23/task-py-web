
import { Outlet } from "react-router-dom";
import { NavbarWrapper } from "@/core/components/NavbarWrapper";
import { SidebarWrapper } from "@/core/components";

export const MainLayout = () => {

  return (
    <section className="flex">
      <SidebarWrapper />
      <NavbarWrapper>
        <Outlet />
      </NavbarWrapper>
    </section>

  );
};
