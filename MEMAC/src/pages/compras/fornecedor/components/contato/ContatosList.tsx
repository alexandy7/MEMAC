
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContatoData } from "@/types/Fornecedor";

interface ContatosListProps {
  contatos: ContatoData[];
  onEditContato: (contato: ContatoData) => void;
  onDeleteContato: (codigo: string) => void;
  onNewContato: () => void;
  onSalvarFornecedor: () => void;
  onVoltar: () => void;
}

export const ContatosList = ({ 
  contatos, 
  onEditContato, 
  onDeleteContato, 
  onNewContato,
  onSalvarFornecedor,
  onVoltar
}: ContatosListProps) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const handleDeleteClick = (codigo: string) => {
    setConfirmDelete(codigo);
  };
  
  const handleConfirmDelete = () => {
    if (confirmDelete) {
      onDeleteContato(confirmDelete);
      setConfirmDelete(null);
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Contatos do Fornecedor</h3>
        <Button onClick={onNewContato} size="sm" className="bg-navy hover:bg-navy/90 text-white ">
          <Plus className="mr-2 h-4 w-4" />
          Novo Endereço
        </Button>
      </div>
        {/* 
          <div className="space-x-2">
            <Button variant="outline" onClick={onVoltar}>
              Voltar
            </Button>
            <Button onClick={onSalvarFornecedor}>
              Salvar Fornecedor
            </Button>
          </div>
        */}

        <ScrollArea className="h-[calc(100vh-350px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Poder Decisão</TableHead>
                <TableHead>Área Atuação</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contatos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Nenhum contato cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                contatos.map((contato) => (
                  <TableRow key={contato.codigo}>
                    <TableCell>{contato.codigo}</TableCell>
                    <TableCell>{contato.nome}</TableCell>
                    <TableCell>{contato.cargo || '-'}</TableCell>
                    <TableCell>{contato.poderDecisao || '-'}</TableCell>
                    <TableCell>{contato.areaAtuacao || '-'}</TableCell>
                    <TableCell>{contato.telefone1 || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEditContato(contato)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {confirmDelete === contato.codigo ? (
                          <div className="flex space-x-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={handleConfirmDelete}
                            >
                              Confirmar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleCancelDelete}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteClick(contato.codigo)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
