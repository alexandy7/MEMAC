
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cliente } from "@/types/Cliente";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

type EnderecosProps = {
  form: UseFormReturn<Cliente>;
};

export const Enderecos = ({ form }: EnderecosProps) => {
  const { control, register } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "enderecos",
  });

  const handleAddEndereco = () => {
    append({
      tipo: "Fiscal",
      logradouro: "",
      bairro: "",
      municipio: "",
      uf: "",
      cep: "",
      telefone: "",
    });
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Endereço {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Endereço</Label>
                <FormField
                  control={control}
                  name={`enderecos.${index}.tipo`}
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiscal">Fiscal</SelectItem>
                        <SelectItem value="Entrega">Entrega</SelectItem>
                        <SelectItem value="Cobrança">Cobrança</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`logradouro-${index}`}>Logradouro</Label>
                  <Input
                    {...register(`enderecos.${index}.logradouro`)}
                    id={`logradouro-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`bairro-${index}`}>Bairro</Label>
                  <Input
                    {...register(`enderecos.${index}.bairro`)}
                    id={`bairro-${index}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`municipio-${index}`}>Município</Label>
                  <Input
                    {...register(`enderecos.${index}.municipio`)}
                    id={`municipio-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`uf-${index}`}>UF</Label>
                  <Input
                    {...register(`enderecos.${index}.uf`)}
                    id={`uf-${index}`}
                    maxLength={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cep-${index}`}>CEP</Label>
                  <Input
                    {...register(`enderecos.${index}.cep`)}
                    id={`cep-${index}`}
                    placeholder="00000-000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`telefone-${index}`}>Telefone</Label>
                  <Input
                    {...register(`enderecos.${index}.telefone`)}
                    id={`telefone-${index}`}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        type="button" 
        onClick={handleAddEndereco} 
        variant="outline"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Adicionar Endereço
      </Button>
    </div>
  );
};
