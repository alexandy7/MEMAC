import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Save, X, RotateCcw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import ResumoTab from "@/components/produto/ResumoTab";
// import { StockInfoTab } from "@/components/produto/StockInfoTab";
import ManufaturaTab from "@/components/produto/ManufaturaTab";
import { productFormSchema, type ProductFormValues } from "@/types/Product";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CriarProduto = () => {
  const navigate = useNavigate();

  const [basicoSelected, setBasicoSelected] = useState(true);
  const [custoSelected, setCustoSelected] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: "",
      observation: "",
      quantity: 0,
      netWeight: 0,
      grossCost: 0,
      profitMargin: 0,
      additionalCosts: 0,
      project: { value: 0, iss: 0 },
      commercial: { value: 0, ipi: 0, icms: 0 },
      machining: { value: 0, iss: 0 },
      coating: { value: 0, ipi: 0, icms: 0 },
      transport: { value: 0, iss: 0, icms: 0 },
      toto: { value: 0, iss: 0 },
      rawMaterial: { value: 0, ipi: 0, icms: 0 },
      boilermaking: { value: 0, iss: 0 },
      milling: { value: 0, iss: 0 },
      painting: { value: 0, iss: 0 },
      finishing: { value: 0, iss: 0, icms: 0 },
      travelExpenses: { value: 0, iss: 0 },
      packaging: 0,
      others: 0,
    },
  });

  function onSubmit(values: ProductFormValues) {
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

  const calculateTotals = () => {
    const values = form.getValues();

    const totalIss = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'iss' in value) {
        return acc + ((value.value * value.iss) / 100);
      }
      return acc;
    }, 0);

    const totalIpi = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'ipi' in value) {
        return acc + ((value.value * value.ipi) / 100);
      }
      return acc;
    }, 0);

    const totalIcms = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'icms' in value) {
        return acc + ((value.value * value.icms) / 100);
      }
      return acc;
    }, 0);

    const totalCost = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'value' in value) {
        return acc + value.value;
      }
      if (key === 'packaging' || key === 'others') {
        return acc + (value as number);
      }
      return acc;
    }, 0);

    const grossCost = totalCost + totalIss + totalIpi + totalIcms;
    const netCost = totalCost;

    return {
      totalIss: totalIss.toFixed(2),
      totalIpi: totalIpi.toFixed(2),
      totalIcms: totalIcms.toFixed(2),
      totalCost: totalCost.toFixed(2),
      grossCost: grossCost.toFixed(2),
      netCost: netCost.toFixed(2),
    };
  };

  return (
    <Card className="min-h-screen">
        <div className="mx-auto">
        <CardHeader className="pb-12">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            // onClick={onCancel}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            Novo produto
          </CardTitle>
        </div>
      </CardHeader>

          <CardContent className="p-6 pt-0 rounded-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-6">
                      <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                      <TabsTrigger value="manufacturing">Custos de Fabricação</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic">
                      <ResumoTab />
                    </TabsContent>

                    <TabsContent value="manufacturing">
                      <ManufaturaTab form={form} calculateTotals={calculateTotals} />
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Limpar
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                </form>
              </Form>
          </CardContent>
        </div>
    </Card>
  );
};

export default CriarProduto;