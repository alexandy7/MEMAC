
import { useState } from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MobileNav from './MobileNav';

type HeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
  return (
    <header className={cn(
      "fixed top-0 right-0 z-20 flex h-14 items-center border-b border-border bg-background px-4 transition-all duration-300",
      collapsed ? "left-16" : "left-64"
    )}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav />
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
