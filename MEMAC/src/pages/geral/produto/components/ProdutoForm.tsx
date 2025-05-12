import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, emptyProduct } from "@/types/Produto";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const productSchema = z.object({
  category: z.string().min(1, "Categoria é obrigatória"),
  productCode: z.string().min(1, "Código do produto é obrigatório"),
  reference: z.string(),
  brandOrigin: z.string(),
  model: z.string(),
  productDescription: z.string().min(1, "Descrição do produto é obrigatória"),
  fiscalClassificationCode: z.string(),
  ipiPercentage: z.number().min(0),
  unit: z.string().min(1, "Unidade é obrigatória"),
  stockQuantity: z.number().min(0),
  netWeight: z.number().min(0),
  manufacturingTime: z.number().min(0),
  hasCAD: z.boolean().default(false),
  observation: z.string(),
  netCost: z.number().min(0),
  grossCost: z.number().min(0),
});

interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product = emptyProduct, onSave, onCancel }) => {
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const handleSubmit = (data: Product) => {
    onSave({
      ...data,
      id: product.id || Date.now().toString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Código" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referência</FormLabel>
                <FormControl>
                  <Input placeholder="Referência" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandOrigin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origem/Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Origem/Marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiscalClassificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Classificação Fiscal</FormLabel>
                <FormControl>
                  <Input placeholder="Classificação Fiscal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ipiPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>% IPI</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="% IPI" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade</FormLabel>
                <FormControl>
                  <Input placeholder="Unidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade em Estoque</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Quantidade" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="netWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso Líquido</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Peso Líquido" 
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prazo Fabricação (dias)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Prazo Fabricação" 
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="netCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo Líquido</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Custo Líquido" 
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grossCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo Bruto</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Custo Bruto" 
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasCAD"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>CAD Disponível</FormLabel>
                  <FormDescription>
                    O produto possui arquivo CAD?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Produto</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrição detalhada do produto" 
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Observações adicionais" 
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;