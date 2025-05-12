
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { PedidoCompraItem } from "@/types/PedidoCompra";
import { Check, Plus, Printer, Save, Trash, X } from "lucide-react";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

// Mock data para demonstração
const mockFornecedores = [
  { id: "1", razaoSocial: "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO" },
  { id: "2", razaoSocial: "TRANSPORTES E CONSTRUÇÕES LTDA." },
  { id: "3", razaoSocial: "INDUSTRIA MECÂNICA S.A." }
];

const mockCompradores = [
  { id: "1", nome: "Marcos A.C." },
  { id: "2", nome: "Pedro S." },
  { id: "3", nome: "Julia R." }
];

const mockCondPagto = [
  { id: "30", descricao: "30 DDL" },
  { id: "60", descricao: "60 DDL" },
  { id: "vista", descricao: "À Vista" }
];

const PedidoCompra = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [situacao, setSituacao] = useState<"pendente" | "parcial" | "recebido" | "cancelado">("pendente");
  const [itens, setItens] = useState<PedidoCompraItem[]>([
    { 
      id: '01',
      codEngeman: '',
      unidade: '',
      descricao: '',
      quantidade: 0,
      valorUnitario: 0,
      valorTotal: 0
    }
  ]);

  const handleAddItem = () => {
    setItens([...itens, {
      id: String(itens.length + 1).padStart(2, '0'),
      codEngeman: '',
      unidade: '',
      descricao: '',
      quantidade: 0,
      valorUnitario: 0,
      valorTotal: 0
    }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItens = itens.filter((_, i) => i !== index);
    setItens(newItens);
  };

  const handleItemChange = (index: number, field: keyof PedidoCompraItem, value: any) => {
    const newItens = [...itens];
    newItens[index] = { ...newItens[index], [field]: value };

    // Recalcular o valor total do item se a quantidade ou valor unitário foram alterados
    if (field === 'quantidade' || field === 'valorUnitario') {
      const quantidade = field === 'quantidade' ? Number(value) : newItens[index].quantidade;
      const valorUnitario = field === 'valorUnitario' ? Number(value) : newItens[index].valorUnitario;
      newItens[index].valorTotal = quantidade * valorUnitario;
    }

    setItens(newItens);
  };

  const calcularTotalPedido = () => {
    return itens.reduce((total, item) => total + item.valorTotal, 0);
  };

  const handleSalvar = () => {
    toast({
      title: "Pedido salvo",
      description: "Pedido de compra salvo com sucesso!",
    });
  };

  const handleConfirmar = () => {
    toast({
      title: "Pedido confirmado",
      description: "Pedido de compra confirmado com sucesso!",
    });
  };

  const handleCancelar = () => {
    toast({
      title: "Operação cancelada",
      description: "A operação foi cancelada pelo usuário.",
      variant: "destructive",
    });
  };

  return (
    <div className="w-full overflow-hidden px-2 sm:px-4 max-w-full">
        <div className="bg-sidebar text-white p-4 rounded-md shadow-md flex items-center">
      <h1 className="text-xl font-bold">Pedido de compra</h1>
    </div>
      
      <Card className="mt-4 overflow-hidden">
        <CardContent className="p-3 sm:p-6 overflow-auto">
          <ScrollArea className="w-full overflow-auto">
            <div className="min-w-[800px] md:min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 sm:gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="C">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Ano</label>
                  <Input type="text" placeholder="05" className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pedido Nº</label>
                  <Input type="text" placeholder="5716" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rev.</label>
                  <Input type="text" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Abertura</label>
                  <Input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]} 
                  />
                </div>
                
                <div className="hidden md:block"></div> {/* Espaçador para alinhar grid */}
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Razão Social (Fornecedor)</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFornecedores.map((fornecedor) => (
                        <SelectItem key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.razaoSocial}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Atenção de</label>
                  <Input type="text" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone Nº</label>
                  <Input type="tel" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fax Nº</label>
                  <Input type="tel" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nat. Oper.</label>
                  <Input type="text" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">% ICMS</label>
                  <Input type="number" step="0.01" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cond. Pagto.</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCondPagto.map((cond) => (
                        <SelectItem key={cond.id} value={cond.id}>
                          {cond.descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome (Comprador)</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um comprador" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCompradores.map((comprador) => (
                        <SelectItem key={comprador.id} value={comprador.id}>
                          {comprador.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sua Referência</label>
                  <Input type="text" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ref.(OF) Nº</label>
                  <Input type="text" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Local de Entrega</label>
                  <Input type="text" placeholder="CIF ENGEMAN - SP" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Transportadora</label>
                  <Input type="text" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone Nº</label>
                  <Input type="tel" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">(PF) Nº</label>
                  <Input type="text" className="bg-green-50" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">(OC) Nº</label>
                  <Input type="text" />
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />
              
              {/* Tabela de Itens do Pedido */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Itens do Pedido</h3>
                  <Button size="sm" variant="outline" onClick={handleAddItem}>
                    <Plus className="h-4 w-4 mr-1" /> Adicionar Item
                  </Button>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">It.</TableHead>
                        <TableHead>Cód.Engeman</TableHead>
                        <TableHead className="w-16">Un.</TableHead>
                        <TableHead>Descrição (Material/Serviço)</TableHead>
                        <TableHead className="w-16">Qtd.</TableHead>
                        <TableHead className="w-24">($) Unitário</TableHead>
                        <TableHead className="w-16">% IPI</TableHead>
                        <TableHead className="w-16">% ISS</TableHead>
                        <TableHead className="w-24">($) Total</TableHead>
                        <TableHead>Data Entrega</TableHead>
                        <TableHead className="w-16">Atraso</TableHead>
                        <TableHead className="w-12">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itens.map((item, index) => (
                        <TableRow key={index} className="h-12">
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              value={item.codEngeman}
                              onChange={(e) => handleItemChange(index, 'codEngeman', e.target.value)} 
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              value={item.unidade}
                              onChange={(e) => handleItemChange(index, 'unidade', e.target.value)} 
                              className="h-8 w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="text" 
                              value={item.descricao}
                              onChange={(e) => handleItemChange(index, 'descricao', e.target.value)} 
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.quantidade || ''}
                              onChange={(e) => handleItemChange(index, 'quantidade', Number(e.target.value))} 
                              className="h-8 w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.valorUnitario || ''}
                              onChange={(e) => handleItemChange(index, 'valorUnitario', Number(e.target.value))} 
                              className="h-8"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.ipi || ''}
                              onChange={(e) => handleItemChange(index, 'ipi', Number(e.target.value))} 
                              className="h-8 w-full"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.iss || ''}
                              onChange={(e) => handleItemChange(index, 'iss', Number(e.target.value))} 
                              className="h-8 w-full"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.valorTotal || ''}
                              className="h-8 bg-gray-100"
                              readOnly
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="date" 
                              value={item.dataEntrega || ''}
                              onChange={(e) => handleItemChange(index, 'dataEntrega', e.target.value)} 
                              className="h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              value={item.atraso || ''}
                              onChange={(e) => handleItemChange(index, 'atraso', Number(e.target.value))} 
                              className="h-8 w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveItem(index)} 
                              className="h-8 w-8 p-0"
                              disabled={itens.length === 1}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator className="my-4 sm:my-6" />
              
              {/* Seção de Valores e Situação */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Situação</label>
                    <RadioGroup value={situacao} onValueChange={(val) => setSituacao(val as any)} className="flex flex-wrap gap-3 sm:gap-6 bg-gray-100 p-3 sm:p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pendente" id="pendente" />
                        <Label htmlFor="pendente" className="text-yellow-600 font-medium">Pendente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="parcial" id="parcial" />
                        <Label htmlFor="parcial" className="text-blue-600 font-medium">Parcial</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recebido" id="recebido" />
                        <Label htmlFor="recebido" className="text-green-600 font-medium">Recebido</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cancelado" id="cancelado" />
                        <Label htmlFor="cancelado" className="text-red-600 font-medium">Cancelado</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Observações</label>
                    <Textarea className="min-h-[100px]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">($) ISS:</label>
                      <Input 
                        type="number" 
                        className="bg-yellow-50 w-48" 
                        readOnly 
                        value="0"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">($) IPI:</label>
                      <Input 
                        type="number" 
                        className="bg-yellow-50 w-48" 
                        readOnly 
                        value="0"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">($) ICMS:</label>
                      <Input 
                        type="number" 
                        className="bg-yellow-50 w-48" 
                        readOnly 
                        value="0"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium font-bold">($) Pedido:</label>
                      <Input 
                        type="number" 
                        className="bg-yellow-50 w-48 font-bold" 
                        readOnly 
                        value={calcularTotalPedido()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mt-6 gap-2`}>
                {isMobile ? (
                  <>
                    <div className="flex flex-col w-full gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" onClick={handleSalvar}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button size="sm" onClick={handleConfirmar} className="w-full">
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleCancelar} className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/lista-pedidos')}>
                        Voltar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => navigate('/lista-pedidos')}>
                      Voltar
                    </Button>
                    
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSalvar}>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button size="sm" onClick={handleConfirmar} className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleCancelar}>
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

export default PedidoCompra;
