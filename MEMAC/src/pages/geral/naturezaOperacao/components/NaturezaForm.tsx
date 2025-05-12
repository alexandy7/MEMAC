import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NaturezaOperacao } from "@/types/NaturezaOperacao";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface NaturezaOperacaoFormProps {
  initialData: NaturezaOperacao | null;
  onSubmit: (natureza: NaturezaOperacao) => void;
  onCancel: () => void;
}

export function NaturezaOperacaoForm({
  initialData,
  onSubmit,
  onCancel,
}: NaturezaOperacaoFormProps) {
  const [formData, setFormData] = useState<NaturezaOperacao>(
    initialData || {
      codigo: "",
      cfop: "",
      tipo: "",
      subtipo: "",
      descricao: "",
      descricaoReduzida: "",
      condicaoIPI: "Tributado",
      condicaoICMS: "Tributado",
      percentualICMS: 0,
      percentualReducaoICMS: 0,
      validadeDuplicata: false,
      baixaEstoque: false,
    }
  );
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const tipoOptions = ["Entrada", "Saída"];
  const subtipoOptions = ["Estado", "Outros Estados", "Exterior", "Outros"];
  const condicaoOptions = ["Tributado", "Isento", "Não Tributado", "Substituição Tributária"];

  useEffect(()=>{
    setIsVisible(true);
  }, []);

  return (
    <Card className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <CardHeader className="pb-12">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            {initialData ? "Editar" : "Nova"} Natureza de Operação
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cfop">CFOP</Label>
              <Input
                id="cfop"
                name="cfop"
                value={formData.cfop}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo (CFOP)</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleSelectChange("tipo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipoOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            

            <div className="space-y-2">
              <Label htmlFor="subtipo">Sub-tipo (CFOP)</Label>
              <Select
                value={formData.subtipo}
                onValueChange={(value) => handleSelectChange("subtipo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sub-tipo" />
                </SelectTrigger>
                <SelectContent>
                  {subtipoOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            

            <div className="space-y-2 col-span-full">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricaoReduzida">Descrição Reduzida</Label>
              <Input
                id="descricaoReduzida"
                name="descricaoReduzida"
                value={formData.descricaoReduzida}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condicaoIPI">Condição IPI</Label>
              <Select
                value={formData.condicaoIPI}
                onValueChange={(value) => handleSelectChange("condicaoIPI", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  {condicaoOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condicaoICMS">Condição ICMS</Label>
              <Select
                value={formData.condicaoICMS}
                onValueChange={(value) => handleSelectChange("condicaoICMS", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  {condicaoOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentualICMS">% ICMS</Label>
              <Input
                id="percentualICMS"
                name="percentualICMS"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.percentualICMS}
                onChange={handleNumberChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentualReducaoICMS">% Red. ICMS</Label>
              <Input
                id="percentualReducaoICMS"
                name="percentualReducaoICMS"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={formData.percentualReducaoICMS}
                onChange={handleNumberChange}
              />
            </div>

            <div className="space-y-2 flex items-center space-x-2">
              <Checkbox
                id="validadeDuplicata"
                checked={formData.validadeDuplicata}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("validadeDuplicata", checked === true)
                }
              />
              <Label htmlFor="validadeDuplicata" className="cursor-pointer">
                Validade Duplicata?
              </Label>
            </div>

            <div className="space-y-2 flex items-center space-x-2">
              <Checkbox
                id="baixaEstoque"
                checked={formData.baixaEstoque}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("baixaEstoque", checked === true)
                }
              />
              <Label htmlFor="baixaEstoque" className="cursor-pointer">
                Baixa Estoque?
              </Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-navy hover:bg-navy/90 hover:text-purple-200">
              {initialData ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}