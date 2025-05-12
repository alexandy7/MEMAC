
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, FileEdit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PedidoCompraData } from "@/types/PedidoCompra";

// Mock data para pedidos
const mockPedidos: PedidoCompraData[] = [
  {
    id: "1",
    status: "C",
    ano: "05",
    numero: "5716",
    revisao: "",
    dataAbertura: "2025-05-10",
    fornecedor: "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO",
    situacao: "pendente",
    itens: [
      {
        id: "01",
        codEngeman: "ENG-1001",
        unidade: "UN",
        descricao: "Equipamento de Mineração",
        quantidade: 2,
        valorUnitario: 5000,
        valorTotal: 10000
      }
    ],
    valorTotal: 10000
  },
  {
    id: "2",
    status: "A",
    ano: "05",
    numero: "5720",
    revisao: "1",
    dataAbertura: "2025-05-08",
    fornecedor: "TRANSPORTES E CONSTRUÇÕES LTDA.",
    situacao: "recebido",
    itens: [
      {
        id: "01",
        codEngeman: "ENG-2001",
        unidade: "SE",
        descricao: "Serviços de Manutenção",
        quantidade: 1,
        valorUnitario: 8500,
        valorTotal: 8500
      }
    ],
    valorTotal: 8500
  },
  {
    id: "3",
    status: "C",
    ano: "05",
    numero: "5725",
    revisao: "",
    dataAbertura: "2025-05-05",
    fornecedor: "INDUSTRIA MECÂNICA S.A.",
    situacao: "parcial",
    itens: [
      {
        id: "01",
        codEngeman: "ENG-3001",
        unidade: "UN",
        descricao: "Peças de Reposição",
        quantidade: 10,
        valorUnitario: 750,
        valorTotal: 7500
      }
    ],
    valorTotal: 7500
  }
];

const getSituacaoBadge = (situacao: string) => {
  switch (situacao) {
    case "pendente":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
    case "recebido":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Recebido</Badge>;
    case "parcial":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Parcial</Badge>;
    case "cancelado":
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelado</Badge>;
    default:
      return <Badge variant="outline">{situacao}</Badge>;
  }
};

const ListaPedidosCompra = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPedidos = mockPedidos.filter(
    (pedido) => 
      pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.ano.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleNewPedido = () => {
    navigate('/PedidoCompra');
  };

  const handleEditPedido = (id: string) => {
    navigate(`/PedidoCompra/${id}`);
  };

  return (
    <div className="container p-4 mx-auto">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Pedidos de Compra</CardTitle>
            <Button onClick={handleNewPedido} className="bg-navy text-white hover:bg-navy/90 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar pedido por número, fornecedor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Rev.</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPedidos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      Nenhum pedido encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.status}</TableCell>
                      <TableCell>{pedido.ano}</TableCell>
                      <TableCell>{pedido.numero}</TableCell>
                      <TableCell>{pedido.revisao}</TableCell>
                      <TableCell>{formatDate(pedido.dataAbertura)}</TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate">
                          {pedido.fornecedor}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(pedido.valorTotal)}</TableCell>
                      <TableCell>{getSituacaoBadge(pedido.situacao)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPedido(pedido.id)}
                          className="h-8 w-8 p-0"
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaPedidosCompra;
