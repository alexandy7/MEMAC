import React, { useState } from "react";
import { Plus, FileText, Filter, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { CondicaoPagamento, CondicaoPagamentoFormData } from "@/types/CondicaoPagamento";
import CondicaoForm from "./components/CondicaoForm";
import CondicaoTabela from "./components/CondicaoTabela";

// Mock initial data
const initialData: CondicaoPagamento[] = [
    {
        id: "1",
        codigo: "PAG001",
        descricaoCompleta: "Pagamento à vista em dinheiro",
        descricaoReduzida: "À Vista",
        diasVencimento: 0,
        diasDesconto: 0,
    },
    {
        id: "2",
        codigo: "PAG002",
        descricaoCompleta: "Pagamento em 30 dias com boleto bancário",
        descricaoReduzida: "30 Dias",
        diasVencimento: 30,
        diasDesconto: 5,
    },
    {
        id: "3",
        codigo: "PAG003",
        descricaoCompleta: "Pagamento em 2x no cartão de crédito",
        descricaoReduzida: "2x Cartão",
        diasVencimento: 30,
        diasDesconto: 0,
    },
];

export default function CondicaoPagamento() {
    const [paymentConditions, setPaymentConditions] = useState<CondicaoPagamento[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CondicaoPagamento | undefined>(undefined);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    // Filter payment conditions based on search term
    const filteredConditions = paymentConditions.filter(
        (condition) =>
            condition.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condition.descricaoCompleta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condition.descricaoReduzida.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setSelectedItem(undefined);
        setFormOpen(true);
    };

    const handleEdit = (item: CondicaoPagamento) => {
        setSelectedItem(item);
        setFormOpen(true);
    };

    const handleDelete = (id: string) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setPaymentConditions(
                paymentConditions.filter((item) => item.id !== itemToDelete)
            );
            toast.success("Condição de pagamento excluída com sucesso!");
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const handleFormSubmit = (data: CondicaoPagamentoFormData) => {
        if (selectedItem) {
            // Update existing item
            setPaymentConditions(
                paymentConditions.map((item) =>
                    item.id === selectedItem.id
                        ? { ...item, ...data }
                        : item
                )
            );
        } else {
            // Add new item
            const newItem: CondicaoPagamento = {
                id: uuidv4(),
                ...data,
            };
            setPaymentConditions([...paymentConditions, newItem]);
        }
    };

    return (
        <div className="container mx-auto space-y-6">
            <section className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Condições de Pagamento
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Gerencie as condições de pagamento do seu negócio
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button
                            onClick={handleAddNew}
                            className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nova condição
                        </Button>
                    </div>
                </div>
            </section>

            <div className="bg-white rounded-lg" style={{marginTop: "0px"}}>
                <div className="relative max-w-sm mb-6">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar condições..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <CondicaoTabela
                    data={filteredConditions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <CondicaoForm
                open={formOpen}
                onOpenChange={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={selectedItem}
            />

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir esta condição de pagamento? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}