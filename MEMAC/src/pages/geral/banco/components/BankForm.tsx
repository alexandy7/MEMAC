import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LabeledInput from "../../../../components/LabeledInput";
import ContactFields from "./ContactField";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Contact {
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
}

export interface BankFormData {
  agencia: string;
  contaCorrente: string;
  nome: string;
  sigla: string;
  endereco: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string;
  fax: string;
  enderecoWeb: string;
  contatos: Contact[];
}

interface BankFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: BankFormData) => void;
  initialData?: BankFormData | null;
}

const emptyData: BankFormData = {
  agencia: "",
  contaCorrente: "",
  nome: "",
  sigla: "",
  endereco: "",
  municipio: "",
  uf: "",
  cep: "",
  telefone: "",
  fax: "",
  enderecoWeb: "",
  contatos: [{ nome: "", cargo: "", telefone: "", email: "" }, { nome: "", cargo: "", telefone: "", email: "" }],
};

export default function BankForm({ open, onOpenChange, onSubmit, initialData }: BankFormProps) {
  const [form, setForm] = useState<BankFormData>(initialData ?? emptyData);
  const [tab, setTab] = useState("banco");

  React.useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(emptyData);
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index: number, key: keyof Contact, value: string) => {
    const contatos = [...form.contatos];
    contatos[index][key] = value;
    setForm({ ...form, contatos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    toast({ title: initialData ? "Banco atualizado" : "Banco cadastrado!", description: "As informações foram salvas com sucesso." });
    onOpenChange(false);
    setForm(emptyData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Banco" : "Cadastrar Banco"}</DialogTitle>
          <DialogDescription>Preencha as informações do banco e dos contatos responsáveis.</DialogDescription>
        </DialogHeader>
        <form className="mt-2" onSubmit={handleSubmit}>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="banco">Banco</TabsTrigger>
              <TabsTrigger value="contato">Contatos</TabsTrigger>
            </TabsList>
            <TabsContent value="banco">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledInput label="Agência N°" name="agencia" value={form.agencia} onChange={handleChange} placeholder="Ex: 9999" required />
                <LabeledInput label="Conta Corrente N°" name="contaCorrente" value={form.contaCorrente} onChange={handleChange} placeholder="Ex: 1234567-8" required />
                <LabeledInput label="Nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do banco" required />
                <LabeledInput label="Sigla" name="sigla" value={form.sigla} onChange={handleChange} placeholder="Ex: BB" required />
                <LabeledInput label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número" required />
                <LabeledInput label="Município" name="municipio" value={form.municipio} onChange={handleChange} placeholder="Cidade" required />
                <LabeledInput label="UF" name="uf" value={form.uf} onChange={handleChange} placeholder="UF" maxLength={2} required />
                <LabeledInput label="CEP" name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" required />
                <LabeledInput label="Telefone N°" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(99) 99999-9999" />
                <LabeledInput label="Fax N°" name="fax" value={form.fax} onChange={handleChange} placeholder="(99) 99999-9999" />
                <LabeledInput label="Endereço web" name="enderecoWeb" value={form.enderecoWeb} onChange={handleChange} placeholder="https://..." />
              </div>
            </TabsContent>
            <TabsContent value="contato">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[0, 1].map((idx) => (
                  <ContactFields
                    key={idx}
                    index={idx}
                    values={form.contatos[idx]}
                    onChange={handleContactChange}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="flex justify-end gap-2 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300">{initialData ? "Salvar" : "Cadastrar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
