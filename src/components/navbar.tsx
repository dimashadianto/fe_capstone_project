import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { logout } from "@/utils/auth";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user, setUser] = useState({
    id: 0,
    name: '',
    phone: '',
    birth_date: '',
    city: '',
    occupation: '',
    email: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "P";
  };

  const handleLogout = () => {
    logout()
    setUser({
      id: 0,
      name: '',
      phone: '',
      birth_date: '',
      city: '',
      occupation: '',
      email: '',
    });
  };

  return (
    <section className="py-4 px-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <img src="/src/assets/LogoWeb.png" className="max-h-8" alt="logo" />
              <span className="text-lg font-semibold tracking-tighter">
                Kita Sehat
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Articles */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/artikel"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Articles
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Reminder */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/reminder"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Reminder
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {/* Workout */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/workout-categories"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Workout
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 relative">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
              onClick={toggleDropdown}
            >
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>{getInitial(user?.name)}</AvatarFallback>
              </Avatar>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-12 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                {user.id ? (
                  <>
                    <p className="block px-4 py-2 text-sm text-gray-700">{user.name}</p>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</a>
                    <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</a>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
