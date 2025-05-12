
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Sample data for different visualizations
const monthlySales = [
  { name: "Jan", value: 12000 },
  { name: "Fev", value: 15000 },
  { name: "Mar", value: 18000 },
  { name: "Abr", value: 14000 },
  { name: "Mai", value: 19000 },
  { name: "Jun", value: 22000 },
  { name: "Jul", value: 25000 },
  { name: "Ago", value: 21000 },
  { name: "Set", value: 23000 },
  { name: "Out", value: 28000 },
  { name: "Nov", value: 30000 },
  { name: "Dez", value: 35000 }
];

const pedidosPorStatus = [
  { name: "Pendente", value: 25 },
  { name: "Parcial", value: 15 },
  { name: "Recebido", value: 45 },
  { name: "Cancelado", value: 5 }
];

const COLORS = ["#ffd700", "#3b82f6", "#22c55e", "#ef4444"];

const propostasPorTrimestre = [
  { name: "T1", propostas: 15, vendidas: 8, valor: 125000 },
  { name: "T2", propostas: 22, vendidas: 14, valor: 189000 },
  { name: "T3", propostas: 18, vendidas: 11, valor: 156000 },
  { name: "T4", propostas: 25, vendidas: 17, valor: 215000 }
];

const maioresFornecedores = [
  { name: "CIA Metalúrgica", value: 450000 },
  { name: "Indústria Mecânica S.A.", value: 320000 },
  { name: "Transportadora XYZ", value: 280000 },
  { name: "Materiais Elétricos Ltda", value: 150000 },
  { name: "Componentes Industriais", value: 120000 }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const Relatorios = () => {
  const [activeTab, setActiveTab] = useState("visao-geral");

  return (
    <div className="container p-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Relatórios e Análises</h1>
      
      <Tabs 
        defaultValue="visao-geral" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 grid grid-cols-4 w-full">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="propostas">Propostas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral de Vendas</CardTitle>
                <CardDescription>Vendas mensais do ano atual</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{ sales: { color: "#3b82f6" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `R$${value/1000}k`} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border border-border p-2 rounded-md shadow-md">
                                <p className="font-medium">{payload[0].payload.name}</p>
                                <p className="text-muted-foreground">
                                  {formatCurrency(payload[0].value as number)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        name="Vendas" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Pedidos</CardTitle>
                <CardDescription>Distribuição por situação</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{
                  Pendente: { color: "#ffd700" },
                  Parcial: { color: "#3b82f6" },
                  Recebido: { color: "#22c55e" },
                  Cancelado: { color: "#ef4444" },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pedidosPorStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pedidosPorStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border border-border p-2 rounded-md shadow-md">
                                <p className="font-medium">{payload[0].name}</p>
                                <p className="text-muted-foreground">
                                  {payload[0].value} pedidos ({((payload[0].value as number) / 90 * 100).toFixed(0)}%)
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Trimestre</CardTitle>
              <CardDescription>Quantidade de propostas e propostas vendidas</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{
                propostas: { color: "#9b87f5" },
                vendidas: { color: "#22c55e" },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={propostasPorTrimestre}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-2 rounded-md shadow-md">
                              <p className="font-medium">{payload[0].payload.name}</p>
                              <p className="text-muted-foreground">
                                Propostas: {payload[0].value}
                              </p>
                              <p className="text-muted-foreground">
                                Vendidas: {payload[1].value}
                              </p>
                              <p className="font-medium mt-1">
                                {formatCurrency(payload[0].payload.valor)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="propostas" fill="#9b87f5" name="Total Propostas" />
                    <Bar yAxisId="right" dataKey="vendidas" fill="#22c55e" name="Propostas Vendidas" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financeiro" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-xl">Total de Vendas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{formatCurrency(1250000)}</p>
                <p className="text-sm text-muted-foreground mt-1">Últimos 12 meses</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-xl">Valor em Pedidos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{formatCurrency(450000)}</p>
                <p className="text-sm text-muted-foreground mt-1">Pedidos em andamento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-xl">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{formatCurrency(35000)}</p>
                <p className="text-sm text-muted-foreground mt-1">Por pedido</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Maiores Fornecedores</CardTitle>
              <CardDescription>Por valor de compras</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ fornecedores: { color: "#9b87f5" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={maioresFornecedores}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `R$${value/1000}k`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value as number), "Valor"]}
                    />
                    <Bar dataKey="value" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pedidos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="bg-yellow-100/50">
                <CardTitle className="text-lg">Pendentes</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold">25</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-blue-100/50">
                <CardTitle className="text-lg">Parciais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold">15</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-green-100/50">
                <CardTitle className="text-lg">Recebidos</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold">45</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-red-100/50">
                <CardTitle className="text-lg">Cancelados</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-bold">5</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Pedidos por Período</CardTitle>
              <CardDescription>Últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ pedidos: { color: "#9b87f5" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySales.map(item => ({ ...item, pedidos: Math.round(item.value / 2500) }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="pedidos" 
                      stroke="#9b87f5" 
                      name="Número de Pedidos"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="propostas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Propostas enviadas vs. vendidas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{
                  Pendente: { color: "#ffd700" },
                  Vendida: { color: "#22c55e" },
                  Perdida: { color: "#ef4444" },
                  Cancelada: { color: "#475569" },
                  Estimativa: { color: "#3b82f6" },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Pendente", value: 35 },
                          { name: "Vendida", value: 45 },
                          { name: "Perdida", value: 10 },
                          { name: "Cancelada", value: 5 },
                          { name: "Estimativa", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Pendente", color: "#ffd700" },
                          { name: "Vendida", color: "#22c55e" },
                          { name: "Perdida", color: "#ef4444" },
                          { name: "Cancelada", color: "#475569" },
                          { name: "Estimativa", color: "#3b82f6" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor Médio de Propostas</CardTitle>
                <CardDescription>Por trimestre</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer config={{ 
                  valor: { color: "#22c55e" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={propostasPorTrimestre}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `R$${value/1000}k`} />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), "Valor"]}
                      />
                      <Legend />
                      <Bar dataKey="valor" fill="#22c55e" name="Valor Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Propostas por Tipo</CardTitle>
              <CardDescription>Distribuição por categorias</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{
                P: { color: "#3b82f6" },
                F: { color: "#9b87f5" },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Materiais", P: 35, F: 12 },
                    { name: "Serviços", P: 28, F: 18 },
                    { name: "Equipamentos", P: 42, F: 8 },
                    { name: "Manutenção", P: 15, F: 32 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="P" fill="#3b82f6" name="Propostas (P)" />
                    <Bar dataKey="F" fill="#9b87f5" name="Fornecimento (F)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;
