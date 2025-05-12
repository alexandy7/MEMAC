import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NaturezaOperacao } from "@/types/NaturezaOperacao";
import { Edit, Trash2, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

interface NaturezaOperacaoListProps {
  naturezas: NaturezaOperacao[];
  onEdit: (natureza: NaturezaOperacao) => void;
  onDelete: (id: number) => void;
}

export function NaturezaList({
  naturezas,
  onEdit,
  onDelete,
}: NaturezaOperacaoListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const filteredNaturezas = naturezas.filter(
    (natureza) =>
      natureza.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      natureza.cfop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      natureza.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      natureza.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 mx-0">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Buscar por código, CFOP, tipo ou descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {filteredNaturezas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma natureza de operação encontrada.
            </div>
          ) : (
            filteredNaturezas.map((natureza) => (
              <Card key={natureza.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {natureza.codigo} - {natureza.cfop}
                      </h3>
                      <p className="text-sm text-gray-500">{natureza.descricaoReduzida}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(natureza)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => natureza.id && onDelete(natureza.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                    <div>
                      <p className="text-gray-500">Tipo</p>
                      <p>{natureza.tipo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Sub-tipo</p>
                      <p>{natureza.subtipo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Condição ICMS</p>
                      <p>{natureza.condicaoICMS}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">% ICMS</p>
                      <p>{natureza.percentualICMS}%</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={natureza.validadeDuplicata} disabled />
                      <span>Validade Duplicata</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={natureza.baixaEstoque} disabled />
                      <span>Baixa Estoque</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden" style={{ marginTop: "0px" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead className="w-[100px]">CFOP</TableHead>
                <TableHead className="w-[120px]">Tipo</TableHead>
                <TableHead className="w-[120px]">Sub-tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[140px]">Cond. ICMS</TableHead>
                <TableHead className="w-[100px]">% ICMS</TableHead>
                <TableHead className="w-[80px]">Dupl.</TableHead>
                <TableHead className="w-[80px]">Estoque</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNaturezas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center h-24 text-gray-500">
                    Nenhuma natureza de operação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredNaturezas.map((natureza) => (
                  <TableRow key={natureza.id}>
                    <TableCell className="font-medium">{natureza.codigo}</TableCell>
                    <TableCell>{natureza.cfop}</TableCell>
                    <TableCell>{natureza.tipo}</TableCell>
                    <TableCell>{natureza.subtipo}</TableCell>
                    <TableCell className="max-w-[300px] truncate" title={natureza.descricao}>
                      {natureza.descricaoReduzida}
                    </TableCell>
                    <TableCell>{natureza.condicaoICMS}</TableCell>
                    <TableCell>{natureza.percentualICMS}%</TableCell>
                    <TableCell>
                      <Checkbox checked={natureza.validadeDuplicata} disabled />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={natureza.baixaEstoque} disabled />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(natureza)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => natureza.id && onDelete(natureza.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}