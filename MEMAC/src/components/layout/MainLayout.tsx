import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cn(
        "transition-all duration-300 flex flex-col min-h-screen w-full",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={cn(
          "flex-1 px-4 py-8 mt-14"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
