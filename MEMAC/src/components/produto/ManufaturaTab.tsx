import { FileText, Database, ChevronDown, ChevronUp } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../../types/Product.ts";
import CustoTab from "./CustoTab";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ManufacturingTabProps {
    form: UseFormReturn<ProductFormValues>;
    calculateTotals: () => {
        totalIss: string;
        totalIpi: string;
        totalIcms: string;
        totalCost: string;
        grossCost: string;
        netCost: string;
    };
}

interface CategoryProps {
    id: keyof ProductFormValues;
    label: string;
    taxes: {
        iss?: boolean;
        ipi?: boolean;
        icms?: boolean;
    };
}

const AVAILABLE_CATEGORIES: CategoryProps[] = [
    { id: "project", label: "Projeto", taxes: { iss: true } },
    { id: "commercial", label: "Comercial", taxes: { ipi: true, icms: true } },
    { id: "machining", label: "Usinagem", taxes: { iss: true } },
    { id: "coating", label: "Revestimento", taxes: { ipi: true, icms: true } },
    { id: "transport", label: "Transporte", taxes: { iss: true, icms: true } },
    { id: "toto", label: "ToTo", taxes: { iss: true } },
    { id: "rawMaterial", label: "Matéria Prima", taxes: { ipi: true, icms: true } },
    { id: "boilermaking", label: "Caldeiraria", taxes: { iss: true } },
    { id: "milling", label: "Frezagem", taxes: { iss: true } },
    { id: "painting", label: "Pintura", taxes: { iss: true } },
    { id: "finishing", label: "Acabamento", taxes: { iss: true, icms: true } },
    { id: "travelExpenses", label: "Despesa Viagem", taxes: { iss: true } },
];

const CollapsibleCategory = ({ category, form }: { category: CategoryProps; form: UseFormReturn<ProductFormValues> }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border rounded-md mb-3">
            <button
                type="button"
                className="flex justify-between items-center w-full p-3 text-left font-medium bg-gray-50 hover:bg-gray-100 rounded-t-md"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>{category.label}</span>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isExpanded && (
                <div className="p-3">
                    <CustoTab
                        form={form}
                        name={category.id}
                        label={category.label}
                        taxes={category.taxes}
                    />
                </div>
            )}
        </div>
    );
};

const ManufaturaTab = ({ form, calculateTotals }: ManufacturingTabProps) => {
    return (
        <div className="space-y-4 p-5">
            <FormProvider {...form}>
                <h2 className="text-xl font-semibold">Custo Fabricação</h2>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <FormField
                        control={form.control}
                        name="orderNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pedido Nº</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input className="pl-8" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="supplierCompany"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Razão Social (Fornecedor)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Database className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input className="pl-8" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nota Fiscal</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input className="pl-8" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-md font-medium mb-2">Categorias de custo</h3>

                    {AVAILABLE_CATEGORIES.map(category => (
                        <CollapsibleCategory
                            key={category.id}
                            category={category}
                            form={form}
                        />
                    ))}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                            control={form.control}
                            name="packaging"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Embalagem</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                type="number"
                                                step="0.01"
                                                className="pl-8"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="others"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Outros</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                type="number"
                                                step="0.01"
                                                className="pl-8"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="bg-gray-100 p-6 rounded-lg space-y-4 mt-6">
                        <h3 className="font-semibold text-lg mb-4">Resumo dos Custos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Total ISS</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().totalIss}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total IPI</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().totalIpi}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total ICMS</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().totalIcms}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Custo Total</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().totalCost}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Custo Bruto</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().grossCost}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Custo Líquido</p>
                                <p className="text-lg font-semibold">R$ {calculateTotals().netCost}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};

export default ManufaturaTab;