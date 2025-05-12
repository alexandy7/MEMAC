
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import type { Cliente } from "@/types/Cliente";
  
  type ClienteTableProps = {
    clientes: Cliente[];
  };
  
  const ClienteTable = ({ clientes }: ClienteTableProps) => {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Município</TableHead>
              <TableHead>UF</TableHead>
              <TableHead>Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.codigo}>
                <TableCell>{cliente.codigo}</TableCell>
                <TableCell>{cliente.razaoSocial}</TableCell>
                <TableCell>{cliente.cnpj}</TableCell>
                <TableCell>{cliente.municipio}</TableCell>
                <TableCell>{cliente.uf}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
              </TableRow>
            ))}
            {clientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhum cliente cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ClienteTable;
  