
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Menu, File, Package, Truck, Briefcase, Users, ShoppingCart, 
  Settings, CreditCard, FileText, Wallet, User 
} from 'lucide-react';

// Use the same nav structure from Sidebar
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
      { title: 'Cliente', path: '/cliente', icon: Users },
      { title: 'Vendedor / Representante', path: '/vendedor', icon: User },
      { title: 'Proposta de fornecimento', path: '/proposta', icon: File },
      { title: 'Ordem de fornecimento', path: '/ordem', icon: FileText },
    ],
  },
  {
    title: 'Compras',
    items: [
      { title: 'Fornecedor', path: '/fornecedor', icon: Briefcase },
      { title: 'Pedido de compra', path: '/pedido-compra', icon: ShoppingCart },
    ],
  },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <SheetHeader className="px-4">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-500" />
            <span>Usinagem</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-2 py-4">
          {navSections.map((section) => (
            <div key={section.title} className="py-2">
              <div className="nav-section-title">{section.title}</div>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'nav-link mx-2',
                      isActive && 'active'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      (section.title === 'Vendas' || section.title === 'Compras') 
                        ? "text-brand-400" 
                        : ""
                    )} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
