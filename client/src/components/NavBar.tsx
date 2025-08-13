import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { NavItemType } from '@/types';
import { cn } from '@/lib/utils';
import { SoapDispenserDroplet } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/useLogout';

interface NavBarProps {
  heading?: string;
  navItems: NavItemType[];
}

const NavBar: React.FC<NavBarProps> = ({ heading, navItems }) => {
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <ul className={cn(mobile ? 'flex flex-col space-y-2' : 'flex space-x-2')}>
      {navItems.map(item => {
        return item.text === 'Logout' ? (
          <li key={item.text}>
            <Button
              variant='ghost'
              onClick={logout}
              className={cn(
                mobile
                  ? 'text-foreground hover:bg-accent hover:text-accent-foreground w-full justify-start'
                  : 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
                'transition-colors duration-200 text-lg'
              )}
            >
              {item.text}
            </Button>
          </li>
        ) : (
          <li key={item.text}>
            <NavLink
              to={item.path}
              onClick={() => mobile && setIsOpen(false)}
              className={({ isActive }) =>
                cn('inline-block', isActive ? 'bg-primary-foreground/20 rounded-md' : '')
              }
            >
              <Button
                variant='ghost'
                className={cn(
                  mobile
                    ? 'text-foreground hover:bg-accent hover:text-accent-foreground w-full justify-start'
                    : 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
                  'transition-colors duration-200 text-lg'
                )}
              >
                {item.text}
              </Button>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className='bg-blue-500 text-primary-foreground shadow-md'>
      <div className='flex justify-between items-center px-6 py-4'>
        <div className='flex items-center space-x-2'>
          <SoapDispenserDroplet className='h-8 w-8' />
          <h1 className='text-2xl md:text-4xl font-bold'>{heading}</h1>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:block'>
          <NavItems />
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='text-primary-foreground hover:bg-primary-foreground/10'
              >
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <SheetHeader>
                <SheetTitle className='flex items-center space-x-2 text-left'>
                  <SoapDispenserDroplet />
                  <span>{heading}</span>
                </SheetTitle>
              </SheetHeader>
              <div className='mt-6'>
                <NavItems mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
