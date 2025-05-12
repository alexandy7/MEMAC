import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface ProductDetailsFormProps {
    formData: any;
    categories: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (name: string, value: string) => void;
}

export function ProductDetailsForm({ formData, categories, onChange, onSelectChange }: ProductDetailsFormProps) {
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
                    Cadastro de Produto
                </CardTitle>
                <CardDescription>
                    Insira as informações gerais do produto
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => onSelectChange("category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="productCode">Cód. Produto</Label>
                        <Input
                            id="productCode"
                            name="productCode"
                            value={formData.productCode}
                            onChange={onChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reference">Referência</Label>
                        <Input
                            id="reference"
                            name="reference"
                            value={formData.reference}
                            onChange={onChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="origin">Origem/Marca</Label>
                        <Input
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={onChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="model">Modelo</Label>
                        <Input
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="space-y-2 md:col-span-7">
                        <Label htmlFor="description">Descrição do Produto</Label>
                        <Input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                        <Label htmlFor="equipment">Equipamento</Label>
                        <Input
                            id="equipment"
                            name="equipment"
                            value={formData.equipment}
                            onChange={onChange}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="shelfNumber">Prateleira Nº</Label>
                        <Input
                            id="shelfNumber"
                            name="shelfNumber"
                            value={formData.shelfNumber}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label>Pedido Nº</Label>
                        <Input
                            name="pedidoNumero"
                            value={formData.pedidoNumero}
                            onChange={onChange}
                            placeholder="Número do pedido"
                        />
                    </div>
                    <div>
                        <Label>Razão Social (Fornecedor)</Label>
                        <Input
                            name="fornecedor"
                            value={formData.fornecedor}
                            onChange={onChange}
                            placeholder="Fornecedor"
                        />
                    </div>
                    <div>
                        <Label>N.F. (Forn.) Nº</Label>
                        <Input
                            name="nfNumero"
                            value={formData.nfNumero}
                            onChange={onChange}
                            placeholder="Nº da Nota Fiscal"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}