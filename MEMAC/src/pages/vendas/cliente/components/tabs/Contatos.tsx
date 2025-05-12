
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Cliente } from "@/types/Cliente";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

type ContatosProps = {
  form: UseFormReturn<Cliente>;
};

export const Contatos = ({ form }: ContatosProps) => {
  const { control, register } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "contatos",
  });

  const handleAddContato = () => {
    append({
      nome: "",
      cargo: "",
      poderDecisao: "",
      areaAtuacao: "",
      telefone1: "",
      telefone2: "",
      celular: "",
      email: "",
      observacao: "",
    });
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id} className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contato {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`nome-${index}`}>Nome</Label>
                  <Input
                    {...register(`contatos.${index}.nome`)}
                    id={`nome-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cargo-${index}`}>Cargo</Label>
                  <Input
                    {...register(`contatos.${index}.cargo`)}
                    id={`cargo-${index}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`poderDecisao-${index}`}>Poder de Decisão</Label>
                  <Input
                    {...register(`contatos.${index}.poderDecisao`)}
                    id={`poderDecisao-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`areaAtuacao-${index}`}>Área de Atuação</Label>
                  <Input
                    {...register(`contatos.${index}.areaAtuacao`)}
                    id={`areaAtuacao-${index}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`telefone1-${index}`}>Telefone 1</Label>
                  <Input
                    {...register(`contatos.${index}.telefone1`)}
                    id={`telefone1-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`telefone2-${index}`}>Telefone 2</Label>
                  <Input
                    {...register(`contatos.${index}.telefone2`)}
                    id={`telefone2-${index}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`celular-${index}`}>Celular</Label>
                  <Input
                    {...register(`contatos.${index}.celular`)}
                    id={`celular-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`email-${index}`}>Email</Label>
                  <Input
                    {...register(`contatos.${index}.email`)}
                    id={`email-${index}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`observacao-${index}`}>Observação</Label>
                <Textarea
                  {...register(`contatos.${index}.observacao`)}
                  id={`observacao-${index}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        type="button" 
        onClick={handleAddContato} 
        variant="outline"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Adicionar Contato
      </Button>
    </div>
  );
};
