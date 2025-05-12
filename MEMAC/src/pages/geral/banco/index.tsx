import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, PlusCircle } from "lucide-react";
import BankForm, { BankFormData } from "./components/BankForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

function formatContato(contatos: BankFormData["contatos"]) {
    return contatos
        .map(c => c.nome ? `${c.nome} (${c.cargo})` : null)
        .filter(Boolean)
        .join("; ");
}

const columns = [
    { key: "nome", label: "Nome" },
    { key: "sigla", label: "Sigla" },
    { key: "agencia", label: "Agência" },
    { key: "contaCorrente", label: "Conta Corrente" },
    { key: "municipio", label: "Município" },
    { key: "telefone", label: "Telefone" },
    { key: "contatos", label: "Contatos" }
];

export default function Banco() {
    const [banks, setBanks] = useState<BankFormData[]>([{
        agencia: "03549",
        contaCorrente: "123456789",
        nome: "Banco do Brasil",
        sigla: "BB",
        endereco: "",
        municipio: "Santana",
        uf: "SP",
        cep: "06501235",
        telefone: "4002-8922",
        fax: "",
        enderecoWeb: "https://bb.com.br",
        contatos: [{ nome: "Carlos", cargo: "Gerente", telefone: "4002-8922", email: "" }, { nome: "", cargo: "", telefone: "", email: "" }],
    },
    {
        agencia: "10456",
        contaCorrente: "987654321",
        nome: "Caixa Econômica Federal",
        sigla: "CEF",
        endereco: "Rua das Laranjeiras, 100",
        municipio: "Osasco",
        uf: "SP",
        cep: "06010000",
        telefone: "3004-1100",
        fax: "",
        enderecoWeb: "https://caixa.gov.br",
        contatos: [
            { nome: "Fernanda Souza", cargo: "Gerente de Contas", telefone: "3004-1100", email: "fernanda.souza@caixa.gov.br" },
            { nome: "", cargo: "", telefone: "", email: "" }
        ]
    },
    {
        agencia: "23789",
        contaCorrente: "112233445",
        nome: "Bradesco",
        sigla: "BDC",
        endereco: "Av. Paulista, 1500",
        municipio: "São Paulo",
        uf: "SP",
        cep: "01310100",
        telefone: "4004-1234",
        fax: "",
        enderecoWeb: "https://bradesco.com.br",
        contatos: [
            { nome: "João Lima", cargo: "Supervisor", telefone: "4004-1234", email: "joao.lima@bradesco.com.br" },
            { nome: "", cargo: "", telefone: "", email: "" }
        ]
    }
    ]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const filteredBanks = banks.filter(b =>
        b.nome.toLowerCase().includes(search.toLowerCase()) ||
        b.sigla.toLowerCase().includes(search.toLowerCase()) ||
        b.agencia.includes(search) ||
        b.contaCorrente.includes(search) ||
        b.municipio.toLowerCase().includes(search.toLowerCase())
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
        setBanks(banks => banks.filter((_, i) => i !== idx));
        toast({ title: "Banco removido!", description: "Banco excluído da lista." });
    };

    const handleSubmit = (data: BankFormData) => {
        if (editIdx !== null)
            setBanks((banks) => banks.map((b, i) => (i === editIdx ? data : b)));
        else
            setBanks(banks => [...banks, data]);
        setEditIdx(null);
    };

    return (
        <div className="container mx-auto space-y-6">
            <section className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Banco
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Visualize e cadastre bancos financeiros do seu negócio.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button
                            onClick={handleAdd}
                            className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo banco
                        </Button>
                    </div>
                </div>
            </section>
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
                        {filteredBanks.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-10 text-gray-400 font-medium italic">Nenhum banco cadastrado</td>
                            </tr>
                        )}
                        {filteredBanks.map((bank, idx) => (
                            <tr key={idx} className="border-t group hover:bg-muted/40 transition">
                                <td className="px-4 py-2">{bank.nome}</td>
                                <td className="px-4 py-2">{bank.sigla}</td>
                                <td className="px-4 py-2">{bank.agencia}</td>
                                <td className="px-4 py-2">{bank.contaCorrente}</td>
                                <td className="px-4 py-2">{bank.municipio}</td>
                                <td className="px-4 py-2">{bank.telefone}</td>
                                <td className="px-4 py-2">{formatContato(bank.contatos)}</td>
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
            <BankForm
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSubmit={handleSubmit}
                initialData={editIdx !== null ? banks[editIdx] : null}
            />
        </div>
    );
}