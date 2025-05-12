import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { CondicaoPagamento } from "@/types/CondicaoPagamento";

interface PaymentConditionsTableProps {
  data: CondicaoPagamento[];
  onEdit: (item: CondicaoPagamento) => void;
  onDelete: (id: string) => void;
}

export default function CondicaoTabela({
  data,
  onEdit,
  onDelete,
}: PaymentConditionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead className="hidden md:table-cell">Descrição Completa</TableHead>
            <TableHead>Descrição Reduzida</TableHead>
            <TableHead className="hidden md:table-cell">Dias p/ Vencimento</TableHead>
            <TableHead className="hidden md:table-cell">Dias p/ Desconto</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Nenhuma condição de pagamento cadastrada
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell className="hidden md:table-cell">{item.descricaoCompleta}</TableCell>
                <TableCell>{item.descricaoReduzida}</TableCell>
                <TableCell className="hidden md:table-cell">{item.diasVencimento}</TableCell>
                <TableCell className="hidden md:table-cell">{item.diasDesconto}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}