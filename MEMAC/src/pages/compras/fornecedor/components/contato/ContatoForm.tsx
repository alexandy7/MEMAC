
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ContatoData } from "../../../../../types/Fornecedor";

// Define the schema for the contact form
const contatoSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  cargo: z.string().optional(),
  poderDecisao: z.string().optional(),
  areaAtuacao: z.string().optional(),
  telefone1: z.string().optional(),
  telefone2: z.string().optional(),
  fax: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  obs: z.string().optional(),
});

interface ContatoFormProps {
  initialData: ContatoData;
  onSubmit: (data: ContatoData) => void;
  onCancel: () => void;
}

export const ContatoForm = ({ initialData, onSubmit, onCancel }: ContatoFormProps) => {
  const form = useForm<ContatoData>({
    resolver: zodResolver(contatoSchema),
    defaultValues: initialData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First row */}
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Nome do Contato</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Second row */}
          <FormField
            control={form.control}
            name="cargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="poderDecisao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poder de Decisão</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Autoridade limitada">Autoridade limitada</SelectItem>
                    <SelectItem value="Autoridade plena">Autoridade plena</SelectItem>
                    <SelectItem value="Sem autoridade">Sem autoridade</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaAtuacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área de Atuação</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Compras">Compras</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="Técnico">Técnico</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Third row */}
          <FormField
            control={form.control}
            name="telefone1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (1) Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (2) Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fax Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fourth row */}
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Fifth row */}
          <FormField
            control={form.control}
            name="obs"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Observações sobre o contato..."
                    className="resize-none h-24"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
};
