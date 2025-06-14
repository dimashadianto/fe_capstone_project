import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <section className="py-4 px-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <img src="" className="max-h-8" alt="logo" />
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

                  {/* Calculator */}
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/calculator"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Calculator
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/login">Masuk</a>
            </Button>
            <Button asChild size="sm">
              <a href="/register">Daftar</a>
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;