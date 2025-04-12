'use client';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { signOutAction } from '@/app/auth/actions';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const NavLink = ({
  href,
  children,
  className,
}: { href: string; children: React.ReactNode; className?: string }) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link
      href={href}
      className={cn(
        'h-full w-52 md:hover:border-b-2 content-center py-5',
        isActive && 'md:border-b-2',
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavMenu = () => {
  return (
    <>
      <nav className="contents md:flex justify-center items-center flex-1 ">
        <NavLink href={routes.dashboard.root}>Dashboard</NavLink>
        <NavLink href={routes.compliance.root}>Compliance Tasks</NavLink>
      </nav>

      <nav className="contents md:flex justify-end items-center flex-1 gap-10">
        <NavLink href={routes.profile.root} className="flex items-center justify-center gap-2">
          <User className="h-4 w-4" />
          <span>My Profile</span>
        </NavLink>
        <Button variant="secondary" size="lg" onClick={signOutAction}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </nav>
    </>
  );
};

const MobileNavMenu = () => {
  return (
    <div className="md:hidden flex items-center justify-between">
      <Link href={routes.dashboard.root} className="font-extrabold text-xl content-center">
        ECAP
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger />
            <NavigationMenuContent className="flex flex-col">
              <NavMenu />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const DesktopNav = () => {
  return (
    <div className="md:flex justify-between items-center hidden">
      <Link href={routes.dashboard.root} className="font-extrabold text-xl content-center">
        ECAP
      </Link>

      <NavMenu />
    </div>
  );
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="inline-grid grid-rows-[auto_1fr] h-screen w-screen overflow-x-hidden bg-white">
      <section className="lg:sticky top-0 z-10">
        <header className="bg-primary px-6 text-primary-foreground h-20 text-center content-center">
          <DesktopNav />
          <MobileNavMenu />
        </header>
      </section>

      {/* Main content */}
      <main className="md:px-10 px-4 lg:h-full lg:inline-grid grid-rows-[auto_auto_1fr] grid-flow-row-dense lg:overflow-hidden max-w-[100vw]">{children}</main>
    </div>
  );
}
