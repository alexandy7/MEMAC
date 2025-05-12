import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LabeledInput from "../../../../components/LabeledInput";
import CarrierContactFields from "./ContatosTransportadora";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface CarrierContact {
    nome: string;
    cargo: string;
    telefone: string;
}

export interface CarrierFormData {
    razaoSocial: string;
    nomeReduzido: string;
    telefone: string;
    endereco: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    cnpj: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    contatos: [CarrierContact, CarrierContact];
    enderecoWeb: string;
    email: string;
}

interface CarrierFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: CarrierFormData) => void;
    initialData?: CarrierFormData | null;
}

// Make sure we create a deep copy to avoid reference issues
const emptyContact: CarrierContact = { nome: "", cargo: "", telefone: "" };

// Fixed to always have exactly 2 contacts with the tuple type
const emptyData: CarrierFormData = {
    razaoSocial: "",
    nomeReduzido: "",
    telefone: "",
    endereco: "",
    bairro: "",
    municipio: "",
    uf: "",
    cep: "",
    cnpj: "",
    inscricaoEstadual: "",
    inscricaoMunicipal: "",
    contatos: [
        { ...emptyContact },
        { ...emptyContact }
    ],
    enderecoWeb: "",
    email: "",
};

export default function CarrierForm({ open, onOpenChange, onSubmit, initialData }: CarrierFormProps) {
    const [form, setForm] = useState<CarrierFormData>(initialData ?? emptyData);
    const [tab, setTab] = useState("transportadora");

    React.useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm(emptyData);
    }, [initialData, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContactChange = (index: number, key: keyof CarrierContact, value: string) => {
        const contatos: [CarrierContact, CarrierContact] = [...form.contatos] as [CarrierContact, CarrierContact];
        contatos[index][key] = value;
        setForm({ ...form, contatos });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
        toast({ title: initialData ? "Transportadora atualizada" : "Transportadora cadastrada!", description: "As informações foram salvas com sucesso." });
        onOpenChange(false);
        setForm(emptyData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Editar Transportadora" : "Cadastrar Transportadora"}</DialogTitle>
                    <DialogDescription>Preencha as informações da transportadora e dos contatos responsáveis.</DialogDescription>
                </DialogHeader>
                <form className="mt-2" onSubmit={handleSubmit}>
                    <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="grid grid-cols-2 mb-4">
                            <TabsTrigger value="transportadora">Transportadora</TabsTrigger>
                            <TabsTrigger value="contato">Contatos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transportadora">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <LabeledInput label="Razão Social" name="razaoSocial" value={form.razaoSocial} onChange={handleChange} placeholder="Razão Social" required />
                                <LabeledInput label="Nome Reduzido" name="nomeReduzido" value={form.nomeReduzido} onChange={handleChange} placeholder="Nome Reduzido" required />
                                <LabeledInput label="Telefone N°" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(99) 99999-9999" />
                                <LabeledInput label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número" required />
                                <LabeledInput label="Bairro" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" required />
                                <LabeledInput label="Município" name="municipio" value={form.municipio} onChange={handleChange} placeholder="Cidade" required />
                                <LabeledInput label="UF" name="uf" value={form.uf} onChange={handleChange} placeholder="UF" maxLength={2} required />
                                <LabeledInput label="CEP" name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" required />
                                <LabeledInput label="C.N.P.J(MF) Nº" name="cnpj" value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" required />
                                <LabeledInput label="Inscrição Estadual Nº" name="inscricaoEstadual" value={form.inscricaoEstadual} onChange={handleChange} placeholder="Inscrição Estadual" />
                                <LabeledInput label="Inscrição Municipal Nº" name="inscricaoMunicipal" value={form.inscricaoMunicipal} onChange={handleChange} placeholder="Inscrição Municipal" />
                                <LabeledInput label="Endereço web" name="enderecoWeb" value={form.enderecoWeb} onChange={handleChange} placeholder="https://..." />
                                <LabeledInput label="E-mail" name="email" value={form.email} onChange={handleChange} placeholder="contato@email.com" />
                            </div>
                        </TabsContent>
                        <TabsContent value="contato">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[0, 1].map((idx) => (
                                    <CarrierContactFields
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
                        <Button type="submit" className="flex items-center bg-navy hover:bg-navy/90 text white transition-all duration-300">{initialData ? "Salvar" : "Cadastrar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
