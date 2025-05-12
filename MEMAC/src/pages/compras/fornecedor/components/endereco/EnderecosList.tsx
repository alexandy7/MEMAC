
import { Plus, Save, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface EnderecoData {
  codigo: string;
  tipo: string;
  endereco: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  cnpj?: string;
}

interface EnderecosListProps {
  enderecos: EnderecoData[];
  onEditEndereco: (endereco: EnderecoData) => void;
  onDeleteEndereco: (codigo: string) => void;
  onNewEndereco: () => void;
  onSalvarFornecedor: () => void;
  onVoltar: () => void;
}

export const EnderecosList = ({
  enderecos,
  onEditEndereco,
  onDeleteEndereco,
  onNewEndereco,
  onSalvarFornecedor,
  onVoltar
}: EnderecosListProps) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Endereços do Fornecedor</h3>
        <Button onClick={onNewEndereco} size="sm" className="bg-navy hover:bg-navy/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Novo Endereço
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>UF</TableHead>
              <TableHead>CEP</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enderecos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Nenhum endereço cadastrado
                </TableCell>
              </TableRow>
            ) : (
              enderecos.map((endereco) => (
                <TableRow key={endereco.codigo}>
                  <TableCell>{endereco.codigo}</TableCell>
                  <TableCell>{endereco.tipo}</TableCell>
                  <TableCell>{endereco.endereco}</TableCell>
                  <TableCell>{endereco.bairro}</TableCell>
                  <TableCell>{endereco.municipio}</TableCell>
                  <TableCell>{endereco.uf}</TableCell>
                  <TableCell>{endereco.cep}</TableCell>
                  <TableCell>{endereco.cnpj}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => onEditEndereco(endereco)}
                    >
                      <span className="sr-only">Editar</span>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                      onClick={() => onDeleteEndereco(endereco.codigo)}
                    >
                      <span className="sr-only">Remover</span>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="flex justify-end space-x-2 pt-4 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onVoltar}
        >
          Voltar
        </Button>
        <Button 
          onClick={onSalvarFornecedor}
          className="bg-navy hover:bg-navy/90 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Salvar Fornecedor
        </Button>
      </div>
    </>
  );
};
