import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, PlusCircle } from "lucide-react";
import CarrierForm, { CarrierFormData } from "./FormTransportadora";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

function formatContato(contatos: CarrierFormData["contatos"]) {
    return contatos
        .map(c => c.nome ? `${c.nome} (${c.cargo})` : null)
        .filter(Boolean)
        .join("; ");
}

const columns = [
    { key: "razaoSocial", label: "Razão Social" },
    { key: "nomeReduzido", label: "Nome Reduzido" },
    { key: "telefone", label: "Telefone" },
    { key: "municipio", label: "Município" },
    { key: "uf", label: "UF" },
    { key: "cnpj", label: "CNPJ" },
    { key: "contatos", label: "Contatos" }
];

export default function ListaTransportadoras() {
    const [carriers, setCarriers] = useState<CarrierFormData[]>([{
        razaoSocial: "TransLog Transportes LTDA",
        nomeReduzido: "TransLog",
        telefone: "11 81725926",
        endereco: "Rod. Anhanguera, Km 110, nº 500",
        bairro: "Jardim Industrial",
        municipio: "Campinas",
        uf: "SP",
        cep: "13065400",
        cnpj: "12.345.678/0001-90",
        inscricaoEstadual: "123456789012",
        inscricaoMunicipal: "9876543210",
        contatos: [
            { nome: "Mariana Silva", cargo: "Coordenadora Logística", telefone: "0800-999-1234" },
            { nome: "", cargo: "", telefone: "" }
        ],
        enderecoWeb: "https://www.translog.com.br",
        email: "contato@translog.com.br"
    },
    {
        razaoSocial: "Rápido Sul Transportes ME",
        nomeReduzido: "Rápido Sul",
        telefone: "11 10724487",
        endereco: "Av. dos Expedicionários, 1200",
        bairro: "Centro",
        municipio: "Porto Alegre",
        uf: "RS",
        cep: "90010900",
        cnpj: "98.765.432/0001-10",
        inscricaoEstadual: "112233445566",
        inscricaoMunicipal: "6655443322",
        contatos: [
            { nome: "Carlos Oliveira", cargo: "Responsável Técnico", telefone: "0800-555-7777"},
            { nome: "", cargo: "", telefone: "" }
        ],
        enderecoWeb: "https://www.rapidosul.com",
        email: "suporte@rapidosul.com"
    }]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const filteredCarriers = carriers.filter(c =>
        c.razaoSocial.toLowerCase().includes(search.toLowerCase()) ||
        c.nomeReduzido.toLowerCase().includes(search.toLowerCase()) ||
        c.municipio.toLowerCase().includes(search.toLowerCase()) ||
        c.cnpj.includes(search)
    );

    const handleAdd = () => {
        setEditIdx(null);
        setModalOpen(true);
    };

    const handleEdit = (idx: number) => {
        setEditIdx(idx);
        setModalOpen(true);
    };

    const handleDelete = (idx: number) => {
        setCarriers(cs => cs.filter((_, i) => i !== idx));
        toast({ title: "Transportadora removida!", description: "Transportadora excluída da lista." });
    };

    const handleSubmit = (data: CarrierFormData) => {
        if (editIdx !== null)
            setCarriers(cs => cs.map((c, i) => (i === editIdx ? data : c)));
        else
            setCarriers(cs => [...cs, data]);
        setEditIdx(null);
    };

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Transportadoras</h1>
                        <p className="mt-1 text-gray-500">
                            Visualize e cadastre transportadoras utilizadas pelo seu negócio.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button onClick={handleAdd} className="flex items-center bg-navy hover:bg-navy/90 text-white transition-all duration-300">
                            <Plus size={20} />
                            Nova transportadora
                        </Button>
                    </div>
                </section>
                <div className="mb-4">
                    <div className="relative max-w-md">
                        <span className="absolute left-3 top-2.5 text-gray-400"><Search size={20} /></span>
                        <Input
                            type="text"
                            className="pl-10"
                            placeholder="Buscar transportadoras..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <Card className="overflow-auto rounded-xl p-0">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr>
                                {columns.map(col => (
                                    <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-800">{col.label}</th>
                                ))}
                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-800">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCarriers.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="text-center py-10 text-gray-400 font-medium italic">Nenhuma transportadora cadastrada</td>
                                </tr>
                            )}
                            {filteredCarriers.map((carrier, idx) => (
                                <tr key={idx} className="border-t group hover:bg-muted/40 transition">
                                    <td className="px-4 py-2">{carrier.razaoSocial}</td>
                                    <td className="px-4 py-2">{carrier.nomeReduzido}</td>
                                    <td className="px-4 py-2">{carrier.telefone}</td>
                                    <td className="px-4 py-2">{carrier.municipio}</td>
                                    <td className="px-4 py-2">{carrier.uf}</td>
                                    <td className="px-4 py-2">{carrier.cnpj}</td>
                                    <td className="px-4 py-2">{formatContato(carrier.contatos)}</td>
                                    <td className="px-4 py-2 text-right">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="hover:bg-primary/10 mr-1"
                                            aria-label="Editar"
                                            onClick={() => handleEdit(idx)}>
                                            <Edit size={18} className="text-primary" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="hover:bg-red-100"
                                            aria-label="Excluir"
                                            onClick={() => handleDelete(idx)}>
                                            <Trash2 size={18} className="text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
                <CarrierForm
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    onSubmit={handleSubmit}
                    initialData={editIdx !== null ? carriers[editIdx] : null}
                />
            </div>
        </div>
    );
}