import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface ProductSpecificationsFormProps {
    formData: any;
    units: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (name: string, value: string) => void;
    onCheckboxChange: (name: string, checked: boolean) => void;
}

export function ProductSpecificationsForm({
    formData,
    units,
    onChange,
    onSelectChange,
    onCheckboxChange,
}: ProductSpecificationsFormProps) {

    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(true);
        }, 100);
    }, [])
    return (
        <Card className={`transition-all duration-500 transform ${animation ? "opacity-100" : "opacity-0"}`}>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Especificações do Produto
                </CardTitle>
                <CardDescription>
                    Defina as especificações técnicas e fiscais
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-1">
                        <Label htmlFor="fiscalCode">Cód. Clas. Fiscal</Label>
                        <Input
                            id="fiscalCode"
                            name="fiscalCode"
                            value={formData.fiscalCode}
                            onChange={onChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ipiPercentage">% IPI</Label>
                        <Input
                            id="ipiPercentage"
                            name="ipiPercentage"
                            value={formData.ipiPercentage}
                            onChange={onChange}
                            type="number"
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="unit">Unidade</Label>
                        <Select
                            value={formData.unit}
                            onValueChange={(value) => onSelectChange("unit", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma unidade" />
                            </SelectTrigger>
                            <SelectContent>
                                {units.map((unit) => (
                                    <SelectItem key={unit} value={unit}>
                                        {unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stockQuantity">Qtde. Estoque</Label>
                        <Input
                            id="stockQuantity"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={onChange}
                            type="number"
                            min="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Peso Líquido (Kg)</Label>
                        <Input
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={onChange}
                            type="number"
                            min="0"
                            step="0.001"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productionTime">Prazo Fab.</Label>
                        <Input
                            id="productionTime"
                            name="productionTime"
                            value={formData.productionTime}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <Checkbox
                        id="isCAD"
                        checked={formData.isCAD}
                        onCheckedChange={(checked) =>
                            onCheckboxChange("isCAD", checked as boolean)
                        }
                    />
                    <Label htmlFor="isCAD" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        CAD?
                    </Label>
                </div>
                <div className="space-y-2 mt-4">
                    <Label htmlFor="observations">Observação</Label>
                    <Textarea
                        id="observations"
                        name="observations"
                        value={formData.observations}
                        onChange={onChange}
                        className="min-h-[120px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}