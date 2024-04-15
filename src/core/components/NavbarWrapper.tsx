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

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Tableros", "Kanban"];

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <Navbar
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
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
          <NavbarItem>
            <Link color="foreground" href="#">
              Tareas
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Kanban
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Tableros
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <User   
            name="Oliver Pots"
            description="Senior Fullstack Developer"
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4"
            }}
          />
        </NavbarContent>


        
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

      </Navbar>
      <div className="m-4 lg:m-8">
        {children}
      </div>
    </div>
  );
};
