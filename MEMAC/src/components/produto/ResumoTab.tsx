import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, X, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/layout/Sidebar";
import { Checkbox } from "@radix-ui/react-checkbox";
const formSchema = z.object({
    category: z.string().min(1, "Selecione uma categoria"),
    model: z.string().min(1, "Informe o modelo do produto"),
    description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
    shelfNumber: z.string().min(1, "Informe o número da prateleira"),
    unit: z.string().min(1, "Selecione uma unidade de medida"),
    quantity: z.number().min(0, "A quantidade não pode ser negativa"),
    netWeight: z.number().min(0, "O peso não pode ser negativo"),
    observation: z.string().optional(),
    supplierName: z.string().min(1, "Informe o nome do fornecedor"),
    grossCost: z.number().min(0, "O custo bruto deve ser maior que zero"),
    profitMargin: z.number().min(0, "A margem de lucro não pode ser negativa"),
    additionalCosts: z.number().min(0, "Os custos adicionais não podem ser negativos"),
    productDescription: z.string().min(10, "A descrição do produto deve ter no mínimo 10 caracteres"),
    productCode: z.string().min(1, "Informe o código do produto"),
    reference: z.string().min(1, "Informe a referência"),
    brandOrigin: z.string().min(1, "Informe a origem/marca"),
    fiscalClassificationCode: z.string().min(1, "Informe o código de classificação fiscal"),
    ipiPercentage: z.number().min(0, "O percentual de IPI não pode ser negativo"),
    stockQuantity: z.number().min(0, "A quantidade em estoque não pode ser negativa"),
    manufacturingTime: z.number().min(0, "O prazo de fabricação não pode ser negativo"),
    netCost: z.number().min(0, "O custo líquido deve ser maior que zero"),
    hasCAD: z.boolean().optional(),
});
const ResumoTab = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            observation: "",
            quantity: 0,
            netWeight: 0,
            grossCost: 0,
            profitMargin: 0,
            additionalCosts: 0,
            reference: "",
            brandOrigin: "",
            fiscalClassificationCode: "",
            ipiPercentage: 0,
            stockQuantity: 0,
            manufacturingTime: 0,
            netCost: 0,
            hasCAD: false,
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        toast.success("Produto cadastrado com sucesso!");
        console.log(values);
        navigate("/products");
    }
    const handleCancel = () => {
        navigate("/products");
    };
    const handleReset = () => {
        form.reset();
        toast.info("Formulário limpo");
    };
    // Calcula o lucro líquido baseado nos valores do formulário
    const calculateNetProfit = () => {
        const grossCost = form.watch("grossCost") || 0;
        const profitMargin = form.watch("profitMargin") || 0;
        const additionalCosts = form.watch("additionalCosts") || 0;
        const profit = (grossCost * (profitMargin / 100)) - additionalCosts;
        return profit > 0 ? profit.toFixed(2) : "0.00";
    };

    const categoria = {

    }
    return (
        <div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Informações Básicas */}
                        <div className="space-y-4 p-5">
                            <h2 className="text-xl font-semibold">Informações Básicas</h2>
                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categoria</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Categoria" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="productCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código do Produto</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Código" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="reference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Referência</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Referência" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="brandOrigin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Origem/Marca</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Origem/Marca" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Modelo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Modelo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fiscalClassificationCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código Classificação Fiscal</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Classificação Fiscal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ipiPercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>% IPI</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="% IPI"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unidade</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Unidade" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="stockQuantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantidade em Estoque</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Quantidade"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="netWeight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Peso Líquido</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Peso Líquido"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="manufacturingTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prazo Fabricação (dias)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Prazo Fabricação"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="netCost"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Custo Líquido</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Custo Líquido"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="grossCost"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Custo Bruto</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Custo Bruto"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hasCAD"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>CAD Disponível</FormLabel>
                                                <FormDescription>
                                                    O produto possui arquivo CAD?
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="productDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição do Produto</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descrição detalhada do produto"
                                                className="min-h-[80px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="observation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observação</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Observações adicionais"
                                                className="min-h-[80px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Informações de Estoque */}
                        <div className="space-y-4 p-5">
                            <h2 className="text-xl font-semibold">Informações de Estoque</h2>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="shelfNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número da Prateleira</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex: A-123" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unidade de Medida</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma unidade" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="un" className="cursor-pointer hover:bg-gray-100">Unidade</SelectItem>
                                                    <SelectItem value="kg" className="cursor-pointer hover:bg-gray-100">Quilograma</SelectItem>
                                                    <SelectItem value="lt" className="cursor-pointer hover:bg-gray-100">Litro</SelectItem>
                                                    <SelectItem value="mt" className="cursor-pointer hover:bg-gray-100">Metro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantidade</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="netWeight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Peso Líquido (kg)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="observation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Observação</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Observações adicionais" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
export default ResumoTab;