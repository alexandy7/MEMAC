
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
import { Check, Printer, Save, X } from "lucide-react";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PropostaItemTable } from "../../propostaFornecimento/components/PropostaItemTable";

// Mock das propostas existentes para demonstração
const mockPropostas = [
    { id: "1", numero: "0001", cliente: "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO", data: "21/10/2023", valor: 21250.80 },
    { id: "2", numero: "0002", cliente: "TRANSPORTES E CONSTRUÇÕES LTDA.", data: "15/09/2023", valor: 18500.00 },
    { id: "3", numero: "0003", cliente: "INDUSTRIA MECÂNICA S.A.", data: "05/10/2023", valor: 32450.75 }
];

const OrdemFornecimento = () => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const location = useLocation();

    const [situacao, setSituacao] = useState("pendente");
    const [propostaSelecionada, setPropostaSelecionada] = useState("");
    const [dadosPreenchidos, setDadosPreenchidos] = useState(false);
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

    const { id } = useParams();

    // Get proposta ID from URL query parameter
    useEffect(() => {
        // const queryParams = new URLSearchParams(location.search);
        // const propostaId = queryParams.get('proposta');
        console.log(id);
        if (id) {
            setPropostaSelecionada(id);
        }
    }, [location]);

    // Efeito para preencher dados quando uma proposta for selecionada
    useEffect(() => {
        if (propostaSelecionada) {
            const propostaEncontrada = mockPropostas.find(p => p.id === propostaSelecionada);
            if (propostaEncontrada) {
                setItems([{
                    id: '01',
                    codEngeman: 'AST-0072.07',
                    referencia: 'AST-0072.07',
                    un: 'SE',
                    descricao: 'SERVIÇOS DE AST PARA ESPESSADORES',
                    qtd: 1,
                    custoLiq: 20000,
                    ump: 0,
                    ipi: 5.0,
                    icms: 0,
                    unitario: 21250.80,
                    desc: 0,
                    total: 21250.80,
                    classFiscal: '',
                    prazoEntrega: '30 dias'
                }]);

                setDadosPreenchidos(true);
                toast({
                    title: "Proposta carregada",
                    description: `Proposta ${propostaEncontrada.numero} carregada com sucesso!`,
                });
            }
        }
    }, [propostaSelecionada, toast]);

    const handleConfirm = () => {
        if (!propostaSelecionada) {
            toast({
                title: "Erro",
                description: "Por favor, selecione uma proposta antes de confirmar.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Ordem confirmada",
            description: "Ordem de fornecimento salva com sucesso!",
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
        <div className="w-[80vw] overflow-hidden px-2 sm:px-4 max-w-full">
            <div className="bg-sidebar text-white p-4 rounded-md shadow-md flex items-center">
                <h1 className="text-xl font-bold">Proposta Fornecimento</h1>
            </div>

            <Card className="mt-4 overflow-hidden">
                <CardContent className="p-3 sm:p-6 overflow-auto">
                    <ScrollArea className="w-full overflow-auto">
                        <div className="min-w-[800px] md:min-w-0">
                            {!dadosPreenchidos && (
                                <div className="mb-6 p-4 border border-yellow-300 bg-yellow-50 rounded-md">
                                    <h3 className="font-medium mb-2">Selecione uma proposta para continuar</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Propostas Disponíveis</label>
                                        <Select value={propostaSelecionada} onValueChange={setPropostaSelecionada}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma proposta..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockPropostas.map((proposta) => (
                                                    <SelectItem key={proposta.id} value={proposta.id}>
                                                        Nº {proposta.numero} - {proposta.cliente} (R$ {proposta.valor.toLocaleString('pt-BR')})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 sm:gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tipo</label>
                                    <Select defaultValue="S">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="S">S</SelectItem>
                                            <SelectItem value="C">C</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Ano/Mês</label>
                                    <div className="flex gap-1">
                                        <Input type="text" placeholder="13" className="w-14" />
                                        <span className="flex items-center">/</span>
                                        <Input type="text" placeholder="10" className="w-14" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Ordem Nº</label>
                                    <Input type="text" placeholder="1571" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rev.</label>
                                    <Input type="text" />
                                </div>

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
                                    <label className="text-sm font-medium">Dat. Abertura</label>
                                    <Input
                                        type="date"
                                        defaultValue={dadosPreenchidos ? "2023-10-21" : new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Razão Social (Cliente)</label>
                                    <Input
                                        type="text"
                                        value={dadosPreenchidos ? "CIA. BRASILEIRA DE METALURGIA E MINERAÇÃO" : ""}
                                        readOnly={dadosPreenchidos}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Cód.</label>
                                    <Select defaultValue="01">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="01">01</SelectItem>
                                            <SelectItem value="02">02</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Endereço Entrega</label>
                                    <Input
                                        type="text"
                                        value={dadosPreenchidos ? "CÓRREGO DA MATA S/Nº - ARAXÁ" : ""}
                                        readOnly={dadosPreenchidos}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">C.N.P.J.(MF) Nº</label>
                                    <Input type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Inscrição Estadual Nº</label>
                                    <Input type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome (Vend./Rep.)</label>
                                    <Select defaultValue="PERCIO">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PERCIO">PERCIO CHRISTENSEN</SelectItem>
                                            <SelectItem value="OUTRO">OUTRO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Cond. Pagto.</label>
                                    <Select defaultValue="30">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">30 DDL</SelectItem>
                                            <SelectItem value="60">60 DDL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nº Ped. Compra</label>
                                    <Input type="text" placeholder="6.102" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">% ISS</label>
                                    <Input type="text" defaultValue="5.00" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Cód.</label>
                                    <Select defaultValue="01">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="01">01</SelectItem>
                                            <SelectItem value="02">02</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Endereço Cobrança</label>
                                    <Input
                                        type="text"
                                        value={dadosPreenchidos ? "CÓRREGO DA MATA S/Nº - ARAXÁ" : ""}
                                        readOnly={dadosPreenchidos}
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome Transportadora</label>
                                    <Input
                                        type="text"
                                        value={dadosPreenchidos ? "TRANSPORTES E CONSTRUÇÕES LTDA." : ""}
                                        onChange={() => { }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Telefone Nº</label>
                                    <Input type="tel" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">(PF) Nº</label>
                                    <Input type="text" className="bg-green-100" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">(OC) Nº</label>
                                    <Input type="text" />
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
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                readOnly
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Crédito</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Resultado</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                readOnly
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) Custo Liq.</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) Custo Bruto</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) Custo Liq.(T)</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) ISS</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) IPI</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "0" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) ISS</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                value={dadosPreenchidos ? "1062.54" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) Produtos</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                readOnly
                                                value={dadosPreenchidos ? "21250.8" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">(R$) S/Impostos</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                readOnly
                                                value={dadosPreenchidos ? "20188.26" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Mark-Up</label>
                                            <Input
                                                type="number"
                                                className="bg-yellow-50"
                                                readOnly
                                                value={dadosPreenchidos ? "4.438" : ""}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Observações</label>
                                    <Textarea className="min-h-[100px]" />
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
                                        <RadioGroupItem value="confirmada" id="confirmada" />
                                        <Label htmlFor="confirmada" className="text-green-600 font-medium">Confirmada</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cancelada" id="cancelada" />
                                        <Label htmlFor="cancelada" className="text-red-600 font-medium">Cancelada</Label>
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
                                            <Button size="sm" onClick={handleConfirm} className="w-full bg-navy hover:bg-navy/90 text-white transition-all duration-300">
                                                <Check className="h-4 w-4 mr-2" />
                                                Confirmar
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={handleCancel} className="w-full">
                                                <X className="h-4 w-4 mr-2" />
                                                Cancelar
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-full">
                                                Fechar
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
                                                <Save className="h-4 w-4 mr-2" />
                                                Registrar
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
                                            <Button variant="outline" size="sm">
                                                Fechar
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

export default OrdemFornecimento;
