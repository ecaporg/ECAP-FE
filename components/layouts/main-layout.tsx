'use client';
import { signOutAction } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { routes } from '@/constants/routes';
import { hasPermission } from '@/lib/permissions';
import { useAuth } from '@/providers/auth';
import { cn } from '@/utils';
import { Loader2, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
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
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);
  return (
    <Link
      href={href}
      className={cn(
        'h-[calc(4rem-1px)] w-[12.625rem] md:hover:border-b-2 content-center py-5',
        isActive && 'md:border-b-2 md:bg-[#4C99DCC7]',
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavMenu = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <nav className="contents md:flex justify-center items-center flex-1 ">
        <NavLink href={routes.dashboard.root}>Dashboard</NavLink>
        <NavLink href={routes.compliance.root}>Compliance Tasks</NavLink>
      </nav>

      <nav className="contents md:flex justify-end items-center flex-1 gap-6">
        {hasPermission(user, 'navigation', 'settings') && (
          <NavLink href={routes.settings.root} className="w-[9.125rem] flex items-center justify-center gap-2">
            <Settings className="size-4" />
            <span>Settings</span>
          </NavLink>
        )}
        {hasPermission(user, 'navigation', 'profile') && (
          <NavLink href={routes.profile.root} className="w-[9.125rem] flex items-center justify-center gap-2">
            <User className="size-4" />
            <span>My Profile</span>
          </NavLink>
        )}
        <Button
          variant="secondary"
          className="lg:w-[9.125rem]"
          size="lg"
          onClick={() => {
            setIsLoggingOut(true);
            signOutAction();
          }}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="size-4 mr-2 animate-spin" />
          ) : (
            <LogOut className="size-4 mr-2" />
          )}
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
            <NavigationMenuTrigger className="px-2 [&>svg]:ml-0 size-10" />
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
        <header
          className="bg-primary px-6 text-primary-foreground text-center content-center max-w-[100vw]"
          style={{ height: 'var(--header-height)' }}
        >
          <DesktopNav />
          <MobileNavMenu />
        </header>
      </section>

      {/* Main content */}
      <main className="md:px-10 px-4 overflow-y-auto">{children}</main>
    </div>
  );
}
