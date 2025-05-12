import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CondicaoPagamento, CondicaoPagamentoFormData } from "@/types/CondicaoPagamento";

const formSchema = z.object({
    codigo: z.string().min(1, "O código é obrigatório"),
    descricaoCompleta: z.string().min(3, "A descrição completa deve ter pelo menos 3 caracteres"),
    descricaoReduzida: z.string().min(2, "A descrição reduzida deve ter pelo menos 2 caracteres"),
    diasVencimento: z.coerce.number().int().min(0, "Número de dias deve ser maior ou igual a 0"),
    diasDesconto: z.coerce.number().int().min(0, "Número de dias deve ser maior ou igual a 0"),
});

interface PaymentConditionFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CondicaoPagamentoFormData) => void;
    initialData?: CondicaoPagamento;
}

export default function CondicaoForm({
    open,
    onOpenChange,
    onSubmit,
    initialData,
}: PaymentConditionFormProps) {
    const form = useForm<CondicaoPagamentoFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData != undefined ? {
            codigo: initialData.codigo,
            descricaoCompleta: initialData.descricaoCompleta,
            descricaoReduzida: initialData.descricaoReduzida,
            diasVencimento: initialData.diasVencimento,
            diasDesconto: initialData.diasDesconto,
        } : {
            codigo: "",
            descricaoCompleta: "",
            descricaoReduzida: "",
            diasVencimento: 0,
            diasDesconto: 0,
        },
    });

    function handleSubmit(data: CondicaoPagamentoFormData) {
        console.log("FOI");
        onSubmit(data);
        form.reset();
        onOpenChange(false);
        toast.success("Condição de pagamento salva com sucesso!");
    }
    useEffect(() => {
        if (initialData) {
            form.reset({
                codigo: initialData.codigo,
                descricaoCompleta: initialData.descricaoCompleta,
                descricaoReduzida: initialData.descricaoReduzida,
                diasVencimento: initialData.diasVencimento,
                diasDesconto: initialData.diasDesconto,
            });
        } else {
            form.reset({
                codigo: "",
                descricaoCompleta: "",
                descricaoReduzida: "",
                diasVencimento: 0,
                diasDesconto: 0,
            });
        }
    }, [initialData]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Editar Condição de Pagamento" : "Nova Condição de Pagamento"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Código</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: PAG001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descricaoCompleta"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição Completa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Pagamento à vista em dinheiro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descricaoReduzida"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição Reduzida</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: À Vista" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="diasVencimento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dias para Vencimento</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="diasDesconto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dias para Desconto</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-navy hover:bg-navy/90 hover:text-purple-200">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}