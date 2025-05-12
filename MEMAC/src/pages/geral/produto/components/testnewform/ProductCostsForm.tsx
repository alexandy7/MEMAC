import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CostGroup } from "./CostGroup";
import { useEffect, useState } from "react";

interface ProductCostsFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCostFieldChange: (section: string, field: string, value: string) => void;
}

export function ProductCostsForm({
  formData,
  handleChange,
  handleCostFieldChange,
}: ProductCostsFormProps) {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 100);
  }, [])
  return (
    <Card className={`transition-all duration-500 transform ${animation ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <span>Informações de Custo</span>
        </CardTitle>
        <CardDescription>
          Valores e custos associados ao produto (preencha apenas o que desejar)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="space-y-2">
            <Label htmlFor="costNet">Custo Líquido</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
              <Input
                id="costNet"
                name="costNet"
                value={formData.costNet}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="costGross">Custo Bruto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
              <Input
                id="costGross"
                name="costGross"
                value={formData.costGross}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="costNet1">Custo Líquido (1)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
              <Input
                id="costNet1"
                name="costNet1"
                value={formData.costNet1}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span>Custos Detalhados & Impostos</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <CostGroup label="Projeto" state={formData.projeto} onChange={(f, v) => handleCostFieldChange("projeto", f, v)} />
              <CostGroup label="Comercial" state={formData.comercial} onChange={(f, v) => handleCostFieldChange("comercial", f, v)} />
              <CostGroup label="Usinagem" state={formData.usinagem} onChange={(f, v) => handleCostFieldChange("usinagem", f, v)} />
              <CostGroup label="Revestimento" state={formData.revestimento} onChange={(f, v) => handleCostFieldChange("revestimento", f, v)} />
              <CostGroup label="Transporte" state={formData.transporte} onChange={(f, v) => handleCostFieldChange("transporte", f, v)} />
              <CostGroup label="ToTo" state={formData.toto} onChange={(f, v) => handleCostFieldChange("toto", f, v)} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>% Emb.</Label>
                  <Input
                    type="number"
                    name="embPercent"
                    value={formData.embPercent}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div>
                  <Label>% Embalagem</Label>
                  <Input
                    type="number"
                    name="embalagem.percent"
                    value={formData.embalagem.percent || ""}
                    onChange={e => handleCostFieldChange("embalagem", "percent", e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              <div>
                <Label>% Outros</Label>
                <Input
                  type="number"
                  name="outros.outrosPercent"
                  value={formData.outros.outrosPercent || ""}
                  onChange={e => handleCostFieldChange("outros", "outrosPercent", e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-4">
              <CostGroup label="Caldeiraria" state={formData.caldeiraria} onChange={(f, v) => handleCostFieldChange("caldeiraria", f, v)} />
              <CostGroup label="Fresagem" state={formData.fresagem} onChange={(f, v) => handleCostFieldChange("fresagem", f, v)} />
              <CostGroup label="Pintura" state={formData.pintura} onChange={(f, v) => handleCostFieldChange("pintura", f, v)} />
              <CostGroup label="Acabamento" state={formData.acabamento} onChange={(f, v) => handleCostFieldChange("acabamento", f, v)} />
              <CostGroup label="Desp. Viagem" state={formData.despViagem} onChange={(f, v) => handleCostFieldChange("despViagem", f, v)} />
              <div>
                <Label>($) Outros</Label>
                <Input
                  type="number"
                  name="outros.valor"
                  value={formData.outros.valor || ""}
                  onChange={e => handleCostFieldChange("outros", "valor", e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}