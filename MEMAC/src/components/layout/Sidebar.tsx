// import { Home, Sprout, Landmark , Truck, FileText, HandCoins } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   const menuItems = [
//     { icon: Home, label: "Geral", path: "/" },
//     { icon: Sprout, label: "Natureza operação", path: "/NaturezaOperacao" },
//     { icon: HandCoins, label: "Cond. pagamento", path: "/CondicaoPagamento" },
//     { icon: FileText, label: "Produto", path: "/Produto" },
//     { icon: Landmark , label: "Banco", path: "/Banco" },
//     { icon: Truck, label: "Transportadora", path: "/Transportadora" },
//     { icon: FileText, label: "Relatório", path: "/relatorio" },
//   ];

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-navy p-4 text-white">
//       <div className="mb-8 px-2">
//         <h1 className="text-2xl font-bold">MEMAC</h1>
//       </div>
//       <nav>
//         {menuItems.map(({ icon: Icon, label, path }) => (
//           <Link
//             key={path}
//             to={path}
//             className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
//               location.pathname === path
//                 ? "bg-white/10 text-purple"
//                 : "hover:bg-white/5"
//             }`}
//           >
//             <Icon size={20} />
//             <span>{label}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  File, Package, Truck, Briefcase, Users, ShoppingCart, 
  Settings, CreditCard, FileText, Wallet, User 
} from 'lucide-react';

type NavItemType = {
  title: string;
  path: string;
  icon: React.ElementType;
};

type NavSectionType = {
  title: string;
  items: NavItemType[];
};

const navSections: NavSectionType[] = [
  {
    title: 'Geral',
    items: [
      { title: 'Natureza da operação', path: '/natureza-operacao', icon: FileText },
      { title: 'Condição de pagamento', path: '/condicao-pagamento', icon: CreditCard },
      { title: 'Produto', path: '/produto', icon: Package },
      { title: 'Banco', path: '/banco', icon: Wallet },
      { title: 'Transportadora', path: '/transportadora', icon: Truck },
    ],
  },
  {
    title: 'Vendas',
    items: [
      { title: 'Cliente', path: '/Cliente', icon: Users },
      { title: 'Vendedor / Representante', path: '/VendedorRepresentante', icon: User },
      { title: 'Proposta de fornecimento', path: '/ListaPropostas', icon: File },
      { title: 'Ordem de fornecimento', path: '/OrdemFornecimento', icon: FileText },
    ],
  },
  {
    title: 'Compras',
    items: [
      { title: 'Fornecedor', path: '/Fornecedor', icon: Briefcase },
      { title: 'Pedido de compra', path: '/lista-pedido-compra', icon: ShoppingCart },
    ],
  },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-3 py-4">
        <div className="flex w-full items-center justify-between">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-brand-500" />
              <span className="text-lg font-semibold text-sidebar-foreground">
                MEMAC
              </span>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="flex w-full justify-center">
              <Settings className="h-6 w-6 text-brand-500" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground"
          >
            {collapsed ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-2 px-2">
          {navSections.map((section) => (
            <div key={section.title} className="py-2 text-white">
              {!collapsed && (
                <div className="nav-section-title">{section.title}</div>
              )}
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn('nav-link', isActive && 'active')}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      (section.title === 'Vendas' || section.title === 'Compras') 
                        ? "text-brand-400" 
                        : "text-sidebar-foreground"
                    )} />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;