
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock das propostas existentes para demonstração
const mockPropostas = [
  { id: "1", numero: "0001", cliente: "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO", data: "21/10/2023", valor: 21250.80, situacao: "Aprovada" },
  { id: "2", numero: "0002", cliente: "TRANSPORTES E CONSTRUÇÕES LTDA.", data: "15/09/2023", valor: 18500.00, situacao: "Aprovada" },
  { id: "3", numero: "0003", cliente: "INDUSTRIA MECÂNICA S.A.", data: "05/10/2023", valor: 32450.75, situacao: "Pendente" },
  { id: "4", numero: "0004", cliente: "ENGENHARIA ESPECIALIZADA LTDA.", data: "12/11/2023", valor: 15750.25, situacao: "Aprovada" },
  { id: "5", numero: "0005", cliente: "DISTRIBUIDORA NACIONAL S.A.", data: "03/12/2023", valor: 28900.50, situacao: "Cancelada" }
];

interface SelectPropostaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SelectPropostaModal = ({ isOpen, onClose }: SelectPropostaModalProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropostaId, setSelectedPropostaId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const filteredPropostas = mockPropostas.filter(
    (proposta) =>
      proposta.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProposta = (id: string) => {
    setSelectedPropostaId(id);
  };

  const handleConfirm = () => {
    if (selectedPropostaId) {
      onClose();
      navigate(`/OrdemFornecimento/${selectedPropostaId}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`w-full ${isMobile ? "max-w-[90vw]" : "max-w-[70vw]"}`}>
        <DialogHeader>
          <DialogTitle className="text-xl">Selecionar Proposta de Fornecimento</DialogTitle>
        </DialogHeader>
        
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center ${isMobile ? "space-y-2" : "space-x-2"} mb-4`}>
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Pesquisar por número ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <Button
            onClick={handleConfirm}
            disabled={!selectedPropostaId}
            className={`${isMobile ? "w-full" : ""} bg-navy hover:bg-navy/90 text-white transition-all duration-300`}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirmar
          </Button>
        </div>
        
        <div className="border rounded-md">
          <ScrollArea className={isMobile ? "h-[50vh]" : "h-[300px]"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isMobile ? "w-[60px]" : "w-[80px]"}>Número</TableHead>
                  <TableHead className={isMobile ? "w-[120px]" : "w-[300px]"}>Cliente</TableHead>
                  {!isMobile && <TableHead className="w-[100px]">Data</TableHead>}
                  {!isMobile && <TableHead className="w-[120px] text-right">Valor</TableHead>}
                  <TableHead className={`${isMobile ? "w-[80px]" : "w-[100px]"} text-center`}>Situação</TableHead>
                  <TableHead className="w-[80px] text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPropostas.length > 0 ? (
                  filteredPropostas.map((proposta) => (
                    <TableRow
                      key={proposta.id}
                      className={`cursor-pointer hover:bg-gray-100 ${
                        selectedPropostaId === proposta.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleSelectProposta(proposta.id)}
                    >
                      <TableCell className="font-medium">{proposta.numero}</TableCell>
                      <TableCell className={`${isMobile ? "max-w-[120px]" : "max-w-[300px]"} truncate`}>
                        {proposta.cliente}
                      </TableCell>
                      {!isMobile && <TableCell>{proposta.data}</TableCell>}
                      {!isMobile && <TableCell className="text-right">
                        {proposta.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>}
                      <TableCell className="text-center">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            proposta.situacao === "Aprovada" 
                              ? "bg-green-100 text-green-800" 
                              : proposta.situacao === "Pendente" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {proposta.situacao}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/proposta/${proposta.id}`);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 4 : 6} className="text-center py-8 text-gray-500">
                      Nenhuma proposta encontrada com os termos de pesquisa.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
