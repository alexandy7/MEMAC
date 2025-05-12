import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaveIcon, PlusIcon, TrashIcon, ArrowLeft } from "lucide-react";
import { ProductDetailsForm } from "./ProductDetailsForm";
import { ProductSpecificationsForm } from "./ProductSpecificationForm";
import { ProductCostsForm } from "./ProductCostsForm";

interface ProductFormProps {
    onSubmit?: (data: any) => void;
    onCloseForm: any;
}

export function ProductForm2({ onSubmit, onCloseForm }: ProductFormProps) {
    const [formData, setFormData] = useState({
        category: "",
        productCode: "",
        reference: "",
        origin: "",
        model: "",
        description: "",
        equipment: "",
        shelfNumber: "",
        fiscalCode: "",
        ipiPercentage: "",
        unit: "",
        stockQuantity: "",
        weight: "",
        productionTime: "",
        isCAD: false,
        observations: "",
        costNet: "0,00",
        costGross: "0,00",
        costNet1: "0,00",
        projeto: { valor: "", iss: "", ipi: "", icms: "" },
        comercial: { valor: "", iss: "", ipi: "", icms: "" },
        usinagem: { valor: "", iss: "", ipi: "", icms: "" },
        revestimento: { valor: "", iss: "", ipi: "", icms: "" },
        transporte: { valor: "", iss: "", ipi: "", icms: "" },
        toto: { valor: "", iss: "", ipi: "", icms: "" },
        caldeiraria: { valor: "", iss: "", ipi: "", icms: "" },
        fresagem: { valor: "", iss: "", ipi: "", icms: "" },
        pintura: { valor: "", iss: "", ipi: "", icms: "" },
        acabamento: { valor: "", iss: "", ipi: "", icms: "" },
        despViagem: { valor: "", iss: "", ipi: "", icms: "" },
        outros: { valor: "", outrosPercent: "" },
        embalagem: { valor: "", percent: "" },
        embPercent: "",
        pedidoNumero: "",
        fornecedor: "",
        nfNumero: "",
        totalImpostos: "",
        custoLiquidoRes: "",
        custoBrutoRes: "",
        custoLiquido1Res: "",
        issTotal: "",
        ipiTotal: "",
        icmsTotal: ""
    });

    const [showTaxFields, setShowTaxFields] = useState({
        issTotal: false,
        ipiTotal: false,
        icmsTotal: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleCostFieldChange = (section: string, field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        console.log(formData);
    };

    const categories = ["Eletrônicos", "Equipamentos", "Ferramentas", "Materiais", "Peças"];
    const units = ["UN", "PC", "KG", "L", "M", "CX", "PAR"];

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-7xl">
            <Tabs defaultValue="details" className="w-full">
                <div className="flex">
                    <div
                        onClick={() => onCloseForm(false)}
                        className="flex space-x-4 cursor-pointer">
                        <ArrowLeft />
                        <p>Voltar</p>
                    </div>
                    <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
                        <TabsTrigger value="details">Detalhes</TabsTrigger>
                        <TabsTrigger value="specifications">Especificações</TabsTrigger>
                        <TabsTrigger value="costs">Custos</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="details">
                    <ProductDetailsForm
                        formData={formData}
                        categories={categories}
                        onChange={handleChange}
                        onSelectChange={handleSelectChange}
                    />
                </TabsContent>

                <TabsContent value="specifications">
                    <ProductSpecificationsForm
                        formData={formData}
                        units={units}
                        onChange={handleChange}
                        onSelectChange={handleSelectChange}
                        onCheckboxChange={handleCheckboxChange}
                    />
                </TabsContent>

                <TabsContent value="costs">
                    <ProductCostsForm
                        formData={formData}
                        handleChange={handleChange}
                        handleCostFieldChange={handleCostFieldChange}
                    />
                </TabsContent>
            </Tabs>

            <div className="bg-gray-100 p-6 rounded-lg space-y-4 mt-6">
                <h3 className="font-semibold text-lg mb-4">Resumo dos Custos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Total ISS</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total IPI</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total ICMS</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Custo Total</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Custo Bruto</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Custo Líquido</p>
                        <p className="text-lg font-semibold">R$ 0,00</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
                <Button type="button" variant="outline">
                    <TrashIcon className="mr-2 h-4 w-4" /> Limpar
                </Button>
                <Button type="button" variant="outline">
                    <PlusIcon className="mr-2 h-4 w-4" /> Novo
                </Button>
                <Button type="submit" className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300">
                    <SaveIcon className="mr-2 h-4 w-4" /> Salvar
                </Button>
            </div>
        </form>
    );
}
