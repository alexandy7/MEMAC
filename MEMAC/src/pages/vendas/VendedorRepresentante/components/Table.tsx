
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Representative } from "../../../../types/Representative";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepresentativeTableProps {
  representatives: Representative[];
  onEdit: (rep: Representative) => void;
  onDelete: (id: string) => void;
}

const RepresentativeTable = ({ representatives, onEdit, onDelete }: RepresentativeTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Razão Social</TableHead>
            <TableHead>Nome Reduzido</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Município</TableHead>
            <TableHead>UF</TableHead>
            <TableHead>CNPJ/CPF</TableHead>
            <TableHead>Contatos</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {representatives.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                Nenhum representante ou vendedor cadastrado.
              </TableCell>
            </TableRow>
          ) : (
            representatives.map((rep) => (
              <TableRow key={rep.id}>
                <TableCell>{rep.fullName}</TableCell>
                <TableCell>{rep.shortName}</TableCell>
                <TableCell>{rep.phone}</TableCell>
                <TableCell>{rep.city}</TableCell>
                <TableCell>{rep.state}</TableCell>
                <TableCell>{rep.document}</TableCell>
                <TableCell>{rep.contact}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(rep)}
                    className="h-8 w-8 text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(rep.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RepresentativeTable;
