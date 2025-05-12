
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useState } from 'react';
import { Link } from "react-router-dom";

interface Proposta {
  id: string;
  tipo: string;
  numero: string;
  data: string;
  cliente: string;
  valor: number;
  situacao: "pendente" | "perdida" | "cancelada" | "estimativa" | "vendida";
}

const ListaPropostas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const propostas: Proposta[] = [
    { id: "1", tipo: "P", numero: "25/05-0001", data: "2025-05-08", cliente: "Empresa ABC Ltda", valor: 15200.50, situacao: "pendente" },
    { id: "2", tipo: "P", numero: "25/04-0002", data: "2025-04-15", cliente: "Industria XYZ S/A", valor: 8750.00, situacao: "vendida" },
    { id: "3", tipo: "F", numero: "25/03-0003", data: "2025-03-22", cliente: "Comercial 123 Ltda", valor: 5300.75, situacao: "cancelada" },
    { id: "4", tipo: "P", numero: "25/02-0004", data: "2025-02-10", cliente: "Distribuidora JKL", valor: 12480.00, situacao: "pendente" },
    { id: "5", tipo: "F", numero: "25/01-0005", data: "2025-01-05", cliente: "Fábrica MNO", valor: 9320.25, situacao: "estimativa" },
  ];

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "pendente": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "vendida": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "cancelada": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "estimativa": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "perdida": return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const filteredPropostas = propostas.filter(proposta => 
    proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposta.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="container mx-auto p-4 max-w-[70vw]">
     <div className="bg-sidebar text-white p-4 rounded-md shadow-md flex items-center">
      <h1 className="text-xl font-bold">Proposta Fornecimento</h1>
    </div>
      
      <Card className="mt-4">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6">
          <CardTitle>Propostas de Fornecimento</CardTitle>
          <Link to="/PropostaFornecimento">
            <Button size="sm" className="mt-2 sm:mt-0 bg-navy hover:bg-navy/90 text-white transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Nova Proposta
            </Button>
          </Link>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar por cliente ou número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo/Número</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPropostas.length > 0 ? (
                  filteredPropostas.map((proposta) => (
                    <TableRow key={proposta.id}>
                      <TableCell className="font-medium">{proposta.tipo}-{proposta.numero}</TableCell>
                      <TableCell>{formatDate(proposta.data)}</TableCell>
                      <TableCell>{proposta.cliente}</TableCell>
                      <TableCell className="">{formatCurrency(proposta.valor)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSituacaoColor(proposta.situacao)}>
                          {proposta.situacao.charAt(0).toUpperCase() + proposta.situacao.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link to={`/PropostaFornecimento/${proposta.id}`}>
                          <Button variant="outline" size="sm">Visualizar</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Nenhuma proposta encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaPropostas;
