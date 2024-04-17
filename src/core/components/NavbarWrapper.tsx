import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { appRoutes } from '@/core/config/constants'

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const menuItems = [
    { path: appRoutes.tasksList, title: 'Tareas' },
    { path: appRoutes.kanban, title: 'Kanban' },
    // { path: appRoutes.boards, title: 'Tableros' },
  ];
  

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <Navbar
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen} 
        isBordered
      >

        <NavbarContent>

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">TaskPy</p>
          </NavbarBrand>

        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">

          {
            menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <NavbarItem isActive key={`page-${index}`}>
                  <Link color={isActive ? "primary" : "foreground"} href={item.path} aria-current="page">
                    {item.title}
                  </Link>
                </NavbarItem>
              )
            })
          }

        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <User   
            name="Oliver Pots"
            description="Senior Fullstack Developer"
            avatarProps={{
              src: "/profile.jpg"
            }}
          />
        </NavbarContent>


        {/* Mobile */}
        <NavbarMenu className="bg-default-100/50">
          {menuItems.map((item, index) => (
            <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
              <Link
                color={
                  (location.pathname === item.path)
                    ? "primary"
                    : "foreground"
                }
                className="w-full"
                href={item.path}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        {/* End Mobile */}

      </Navbar>
      <div className="m-4 lg:m-8">
        {children}
      </div>
    </div>
  );
};
