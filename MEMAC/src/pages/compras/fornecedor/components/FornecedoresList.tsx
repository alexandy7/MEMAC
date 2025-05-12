
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

interface Fornecedor {
  id: string;
  razaoSocial: string;
  cnpj: string;
  municipio: string;
  uf: string;
}

interface FornecedoresListProps {
  fornecedores: Fornecedor[];
  onSelectFornecedor: (fornecedor: Fornecedor) => void;
  onNewFornecedor: () => void;
}

export const FornecedoresList = ({ fornecedores, onSelectFornecedor, onNewFornecedor }: FornecedoresListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Lista de Fornecedores</span>
          <Button onClick={onNewFornecedor} className="bg-navy hover:bg-navy/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Novo Fornecedor
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar fornecedor..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Razão Social</TableHead>
                <TableHead>Município</TableHead>
                <TableHead>UF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum fornecedor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredFornecedores.map((fornecedor) => (
                  <TableRow
                    key={fornecedor.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => onSelectFornecedor(fornecedor)}
                  >
                    <TableCell>{fornecedor.id}</TableCell>
                    <TableCell>{fornecedor.cnpj}</TableCell>
                    <TableCell>{fornecedor.razaoSocial}</TableCell>
                    <TableCell>{fornecedor.municipio}</TableCell>
                    <TableCell>{fornecedor.uf}</TableCell>
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
