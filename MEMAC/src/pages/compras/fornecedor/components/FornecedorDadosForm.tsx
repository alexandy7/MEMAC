
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Define the schema for the supplier form
const fornecedorSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório"),
  cnpj: z.string().optional(),
  razaoSocial: z.string().min(1, "Razão Social é obrigatória"),
  nomeReduzido: z.string().min(1, "Nome reduzido é obrigatório"),
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
  endereco: z.string().optional(),
  bairro: z.string().optional(),
  municipio: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  fax: z.string().optional(),
  caixaPostal: z.string().optional(),
  atividade: z.string().optional(),
  naturezaOperacao: z.string().optional(),
  comissao: z.string().optional(),
  transportadora: z.string().optional(),
  condPagto: z.string().optional(),
  banco: z.string().optional(),
  contaCorrente: z.string().optional(),
  enderecoWeb: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  obs: z.string().optional(),
});

export type FornecedorFormValues = z.infer<typeof fornecedorSchema>;

interface FornecedorDadosFormProps {
  initialData: FornecedorFormValues;
  onSubmit: (data: FornecedorFormValues) => void;
  onCancel: () => void;
}

export const FornecedorDadosForm = ({ initialData, onSubmit, onCancel }: FornecedorDadosFormProps) => {
  const form = useForm<FornecedorFormValues>({
    resolver: zodResolver(fornecedorSchema),
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
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ/MF Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="razaoSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razão Social Fornecedor</FormLabel>
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
            name="nomeReduzido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Reduzido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inscricaoEstadual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inscrição Estadual Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inscricaoMunicipal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inscrição Municipal Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Fifth row */}
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone Nº</FormLabel>
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
          <FormField
            control={form.control}
            name="caixaPostal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cx.Postal Nº</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Sixth row */}
          <FormField
            control={form.control}
            name="atividade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Atividade</FormLabel>
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
                    <SelectItem value="comercio">Comércio</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="servico">Serviço</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="naturezaOperacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nat. Operação</FormLabel>
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
                    <SelectItem value="5.916">5.916</SelectItem>
                    <SelectItem value="5.915">5.915</SelectItem>
                    <SelectItem value="5.917">5.917</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comissao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comissão %</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="12.00 %" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Seventh row */}
          <FormField
            control={form.control}
            name="transportadora"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Transportadora</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="transp1">Transportadora 1</SelectItem>
                    <SelectItem value="transp2">Transportadora 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condPagto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cond. Pagto</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="avista">À Vista</SelectItem>
                    <SelectItem value="30dias">30 Dias</SelectItem>
                    <SelectItem value="60dias">60 Dias</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="banco"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Banco/Agência Nº</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="001">Banco do Brasil</SelectItem>
                      <SelectItem value="104">Caixa Econômica</SelectItem>
                      <SelectItem value="341">Itaú</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contaCorrente"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>C/C Nº</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        
          {/* Eighth row */}
          <FormField
            control={form.control}
            name="enderecoWeb"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Endereço Web</FormLabel>
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
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Ninth row */}
          <FormField
            control={form.control}
            name="obs"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Obs.</FormLabel>
                <FormControl>
                  <Input {...field} />
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
