
import { Outlet } from "react-router-dom";
import { NavbarWrapper } from "@/core/components/NavbarWrapper";
import { SidebarWrapper } from "@/core/components";
import { useTaskStore } from "@/store";
import { useEffect } from "react";

export const MainLayout = () => {

  const getTasks = useTaskStore(state => state.getTasks);

  useEffect(() => {
    console.log('layout effect')
    getTasks();
  }, [getTasks]);
  


  return (
    <section className="flex">
      <SidebarWrapper />
      <NavbarWrapper>
        <Outlet />
      </NavbarWrapper>
    </section>

  );
};
