import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/types/Produto";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Custo Líq.</TableHead>
            <TableHead className="text-right">Custo Bruto</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{product.productCode}</TableCell>
              <TableCell>{product.productDescription}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stockQuantity} {product.unit}</TableCell>
              <TableCell className="text-right">
                {product.netCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </TableCell>

              <TableCell className="text-right">R$ {product.grossCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
