
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageContent from "@/components/ui/PageContent";
import { Link } from "react-router-dom";
import { Users, ShoppingCart, Briefcase, FileText } from "lucide-react";

const Index = () => {
  const quickActions = [
    { title: "Proposta Fornecimento", icon: Users, path: "/PropostaFornecimento", color: "bg-blue-100 text-blue-700" },
    { title: "Ordem Fornecimento", icon: Briefcase, path: "/OrdemFornecimento", color: "bg-amber-100 text-amber-700" },
    { title: "Pedidos de Compra", icon: ShoppingCart, path: "/pedido-compra", color: "bg-green-100 text-green-700" },
    { title: "Relatórios", icon: FileText, path: "/Relatorio", color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <PageContent title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link to={action.path} key={action.title}>
            <Card className="hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-md font-medium">
                  {action.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Acessar {action.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-md">
            <p className="text-muted-foreground">Aqui será exibido o gráfico de resumo de vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-md">
            <p className="text-muted-foreground">Lista de atividades recentes</p>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};

export default Index;
