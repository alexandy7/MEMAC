
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DadosGerais } from "./tabs/DadosGerais";
import { Enderecos } from "./tabs/Enderecos";
import { Contatos } from "./tabs/Contatos";
import { Cliente } from "@/types/Cliente";

type ClienteFormProps = {
  onSave: (cliente: Cliente) => void;
  onCancel: () => void;
};

const ClienteForm = ({ onSave, onCancel }: ClienteFormProps) => {
  const [activeTab, setActiveTab] = useState("geral");
  const form = useForm<Cliente>();

  const onSubmit = (data: Cliente) => {
    onSave(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="enderecos">Endereços</TabsTrigger>
          <TabsTrigger value="contatos">Contatos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral">
          <DadosGerais form={form} />
        </TabsContent>
        
        <TabsContent value="enderecos">
          <Enderecos form={form} />
        </TabsContent>
        
        <TabsContent value="contatos">
          <Contatos form={form} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-navy hover:bg-navy/90">Salvar</Button>
      </div>
    </form>
  );
};

export default ClienteForm;
