
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, Pen, Printer, Save, X } from "lucide-react";
import { useState } from 'react';
import { PropostaItemTable } from "./PropostaItemTable";
import { Link } from "react-router-dom";

const PropostaFornecimento = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [situacao, setSituacao] = useState("pendente");
  const [items, setItems] = useState([
    {
      id: '01',
      codEngeman: '',
      referencia: '',
      un: '',
      descricao: '',
      qtd: 0,
      custoLiq: 0,
      ump: 0,
      ipi: 0,
      icms: 0,
      unitario: 0,
      desc: 0,
      total: 0,
      classFiscal: '',
      prazoEntrega: ''
    }
  ]);

  const handleConfirm = () => {
    toast({
      title: "Proposta confirmada",
      description: "Proposta salva com sucesso!",
    });
  };

  const handleCancel = () => {
    toast({
      title: "Operação cancelada",
      description: "A operação foi cancelada pelo usuário.",
      variant: "destructive",
    });
  };

  return (
    <div className="w-full overflow-hidden px-2 sm:px-4 max-w-full">
      <div className="bg-navy text-white p-3 sm:p-4 rounded-md shadow-md flex items-center space-x-4 items-center">
        <Link to={"/ListaPropostas"}
          // onClick={() => onCloseForm(false)}
          className="flex space-x-4 cursor-pointer">
          <ArrowLeft />
        </Link>
        <h1 className="text-lg sm:text-xl font-bold">Proposta Fornecimento</h1>
      </div>

      <Card className="mt-4 overflow-hidden">
        <CardContent className="p-3 sm:p-6 overflow-auto max-w-[75vw]">
          <ScrollArea className="w-full overflow-auto">
            <div className="min-w-[800px] md:min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 sm:gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <Select defaultValue="P">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P">Peça</SelectItem>
                      <SelectItem value="F">Equipamento</SelectItem>
                      <SelectItem value="F">Serviço</SelectItem>
                      <SelectItem value="F">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mês </label>
                  <label className="text-sm font-medium">-</label>
                  <label className="text-sm font-medium"> Ano</label>
                  <div className="flex gap-1">
                    <Input type="text" placeholder="25" className="w-14" />
                    <span className="flex items-center">/</span>
                    <Input type="text" placeholder="05" className="w-14" />
                  </div>
                </div>

                <div className="space-y-2 w-26">
                  <label className="text-sm font-medium">Prop. Nº</label>
                  <Input type="text" placeholder="0001" disabled/>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Rev.</label>
                  <Input type="text" disabled/>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="0">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Orçamento">Orçamento</SelectItem>
                      <SelectItem value="Carteira">Carteira</SelectItem>
                      <SelectItem value="Embarque">Embarque</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dat. Emissão</label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              {/* ... keep existing code (client information fields) */}

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Razão Social (Cliente)</label>
                  <Input type="text" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Atenção de</label>
                  <Input type="text" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone Nº</label>
                  <Input type="tel" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">% ICMS</label>
                  <Input type="number" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome (Vend./Repr.)</label>
                  <Select defaultValue="Mariana Silva">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mariana Silva">Mariana Silva</SelectItem>
                      <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cond. Pagto.</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="[...]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vista">Á vista</SelectItem>
                      <SelectItem value="30dias">30 dias</SelectItem>
                      <SelectItem value="2xcartao">2x Cartão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Local Entrega</label>
                  <Input type="text" placeholder="EX-WORKS" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sua Referência</label>
                  <Input type="text" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Validade Proposta</label>
                  <Input type="text" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ref. (OF) Nº</label>
                  <Input type="text" className="bg-green-100" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">% Desc.</label>
                  <Input type="number" placeholder="0.00000" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">(R$) Desc.</label>
                  <Input type="number" placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dat. Orçamento</label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dat. Apres.</label>
                  <Input type="date" />
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />

              <PropostaItemTable items={items} setItems={setItems} />

              <Separator className="my-4 sm:my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Débito</label>
                      <Input type="number" className="bg-yellow-50" readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Crédito</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resultado</label>
                      <Input type="number" className="bg-yellow-50" readOnly />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) ISS</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) ICMS</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) IPI</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) 3os</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) Desc.</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">(R$) Proposta</label>
                      <Input type="number" className="bg-yellow-50" readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mark-Up</label>
                      <Input type="number" className="bg-yellow-50" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Observações</label>
                  <Textarea className="min-h-[150px]" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Anotações</label>
                  <Textarea className="min-h-[150px]" />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium mb-2 block">Situação</label>
                <RadioGroup value={situacao} onValueChange={setSituacao} className="flex flex-wrap gap-3 sm:gap-6 bg-gray-100 p-3 sm:p-4 rounded-md">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pendente" id="pendente" />
                    <Label htmlFor="pendente" className="text-yellow-600 font-medium">Pendente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="perdida" id="perdida" />
                    <Label htmlFor="perdida">Perdida</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cancelada" id="cancelada" />
                    <Label htmlFor="cancelada">Cancelada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="estimativa" id="estimativa" />
                    <Label htmlFor="estimativa">Estimativa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vendida" id="vendida" />
                    <Label htmlFor="vendida">Vendida</Label>
                  </div>
                  <Button variant="outline" size="sm" className={isMobile ? "w-full mt-2" : "ml-auto"}>
                    Recalcular
                  </Button>
                </RadioGroup>
              </div>

              <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mt-6 gap-2`}>
                {isMobile ? (
                  <>
                    <Button variant="outline" size="sm" className="w-full mb-2">
                      Excluir
                    </Button>

                    <div className="flex flex-col w-full gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Registrar
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Consultar
                      </Button>
                      <Button size="sm" onClick={handleConfirm} className="w-full">
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleCancel} className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm">
                      Excluir
                    </Button>

                    <div className="flex flex-wrap justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pen className="h-4 w-4 mr-2" />
                        Revisar
                      </Button>
                      <Button variant="outline" size="sm">
                        Consultar
                      </Button>
                      <Button size="sm" onClick={handleConfirm} className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropostaFornecimento;
