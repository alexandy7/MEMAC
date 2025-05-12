import { DollarSign, Percent } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormValues } from "../../types/Product.ts";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface CostFieldProps {
    form: UseFormReturn<ProductFormValues>;
    name: keyof ProductFormValues;
    label: string;
    taxes: {
        iss?: boolean;
        ipi?: boolean;
        icms?: boolean;
    };
}

const CustoTab = ({ form, name, label, taxes }: CostFieldProps) => {
    return (
        <div className="space-y-4 bg-gray-50 rounded-lg">
            {/* <ScrollArea className="h-[calc(100vh-220px)]"> */}

            <h3 className="font-medium text-lg">{label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name={`${name}.value` as any}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="number"
                                        step="0.01"
                                        className="pl-8 border-[2px]"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {taxes.iss && (
                    <FormField
                        control={form.control}
                        name={`${name}.iss` as any}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISS</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Percent className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="pl-8 border-[2px]"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {taxes.ipi && (
                    <FormField
                        control={form.control}
                        name={`${name}.ipi` as any}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IPI</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Percent className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
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
                )}

                {taxes.icms && (
                    <FormField
                        control={form.control}
                        name={`${name}.icms` as any}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ICMS</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Percent className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
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
                )}
            </div>
            {/* </ScrollArea> */}
        </div>
    );
};

export default CustoTab;