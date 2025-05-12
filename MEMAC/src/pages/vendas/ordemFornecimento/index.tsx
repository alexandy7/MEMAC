
import { SelectPropostaModal } from "./components/SelectPropostaModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye, List, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock de ordens de fornecimento
const mockOrdens = [
  { 
    id: "1", 
    numero: "S-13/10-1571", 
    cliente: "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO",
    dataAbertura: "21/10/2023",
    valorTotal: 21250.80,
    situacao: "Aprovada",
    propostaId: "1"
  },
  { 
    id: "2", 
    numero: "S-13/09-1520", 
    cliente: "TRANSPORTES E CONSTRUÇÕES LTDA.",
    dataAbertura: "15/09/2023",
    valorTotal: 18500.00,
    situacao: "Pendente",
    propostaId: "2"
  },
  { 
    id: "3", 
    numero: "C-13/11-1595", 
    cliente: "INDUSTRIA MECÂNICA S.A.",
    dataAbertura: "12/11/2023",
    valorTotal: 32450.75,
    situacao: "Aprovada",
    propostaId: "3"
  },
  { 
    id: "4", 
    numero: "S-13/12-1633", 
    cliente: "ENGENHARIA ESPECIALIZADA LTDA.",
    dataAbertura: "03/12/2023",
    valorTotal: 15750.25,
    situacao: "Cancelada",
    propostaId: "4"
  }
];

const ListaOrdens = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtrar ordens com base no termo de pesquisa
  const filteredOrdens = mockOrdens.filter(
    (ordem) =>
      ordem.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Configurações de paginação
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredOrdens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrdens = filteredOrdens.slice(startIndex, startIndex + itemsPerPage);
  
  // Manipuladores
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Volta para a primeira página quando pesquisa
  };
  
  const getSituacaoStyle = (situacao: string) => {
    switch (situacao) {
      case "Aprovada":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full max-w-[70vw] mx-auto px-4 py-6">
     <div className="bg-sidebar text-white p-4 rounded-md shadow-md flex items-center">
      <h1 className="text-xl font-bold">Ordens Fornecimento</h1>
    </div>
      
      <Card className="mt-4">
        <CardContent className="p-6">
          <div className={`flex ${isMobile ? "flex-col space-y-4" : "flex-row justify-between"} mb-6`}>
            <div className={`relative ${isMobile ? "w-full" : "w-[300px]"}`}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Pesquisar por número ou cliente..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            
            <div className={`flex space-x-2 ${isMobile ? "justify-between" : ""}`}>
              <Button variant="outline" onClick={() => navigate("/ListaPropostas")}>
                <List className="h-4 w-4 mr-2" />
                Ver Propostas
              </Button>
              
              <Button onClick={openModal} className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
                Nova Ordem
              </Button>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <ScrollArea className={`w-full ${isMobile ? "overflow-auto" : ""}`}>
            <div className={`${isMobile ? "min-w-[600px]" : ""}`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[130px]">Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="w-[120px]">Data Abertura</TableHead>
                    <TableHead className="w-[150px] text-right">Valor Total</TableHead>
                    <TableHead className="w-[120px] text-center">Situação</TableHead>
                    <TableHead className="w-[100px] text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrdens.length > 0 ? (
                    currentOrdens.map((ordem) => (
                      <TableRow 
                        key={ordem.id} 
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => navigate(`/OrdemFornecimento/${ordem.id}`)}
                      >
                        <TableCell className="font-medium">{ordem.numero}</TableCell>
                        <TableCell className="truncate max-w-[300px]">{ordem.cliente}</TableCell>
                        <TableCell>{ordem.dataAbertura}</TableCell>
                        <TableCell className="text-right">
                          {ordem.valorTotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSituacaoStyle(ordem.situacao)}`}>
                            {ordem.situacao}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/OrdemFornecimento/${ordem.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {searchTerm 
                          ? "Nenhuma ordem encontrada com os termos de pesquisa." 
                          : "Nenhuma ordem de fornecimento registrada."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          
          {filteredOrdens.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
      
      <SelectPropostaModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ListaOrdens;
