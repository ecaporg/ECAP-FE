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
        'h-[calc(4rem-1px)] w-[12.625rem] content-center py-5 md:hover:border-b-2',
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
      <nav className="contents flex-1 items-center justify-center md:flex ">
        <NavLink href={routes.dashboard.root}>Dashboard</NavLink>
        <NavLink href={routes.compliance.root}>Compliance Tasks</NavLink>
      </nav>

      <nav className="contents flex-1 items-center justify-end gap-6 md:flex">
        {hasPermission(user, 'navigation', 'settings') && (
          <NavLink
            href={routes.settings.root}
            className="flex w-[9.125rem] items-center justify-center gap-2"
          >
            <Settings className="size-4" />
            <span>Settings</span>
          </NavLink>
        )}
        {hasPermission(user, 'navigation', 'profile') && (
          <NavLink
            href={routes.profile.root}
            className="flex w-[9.125rem] items-center justify-center gap-2"
          >
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
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}
          Sign Out
        </Button>
      </nav>
    </>
  );
};

const MobileNavMenu = () => {
  return (
    <div className="flex items-center justify-between md:hidden">
      <Link href={routes.dashboard.root} className="content-center font-extrabold text-xl">
        ECAP
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="size-10 px-2 [&>svg]:ml-0" />
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
    <div className="hidden items-center justify-between md:flex">
      <Link href={routes.dashboard.root} className="content-center font-extrabold text-xl">
        ECAP
      </Link>

      <NavMenu />
    </div>
  );
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="inline-grid h-screen w-screen grid-rows-[auto_1fr] overflow-hidden bg-white">
      <section className="top-0 z-10 lg:sticky">
        <header
          className="max-w-[100vw] content-center bg-primary px-6 text-center text-primary-foreground"
          style={{ height: 'var(--header-height)' }}
        >
          <DesktopNav />
          <MobileNavMenu />
        </header>
      </section>

      {/* Main content */}
      <main className="overflow-y-auto px-4 pb-10 md:px-10">{children}</main>
    </div>
  );
}
