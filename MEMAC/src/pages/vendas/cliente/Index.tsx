
import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageContent from "@/components/ui/PageContent";
import ClienteForm from "./components/ClienteForm";
import ClienteTable from "./components/ClienteTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Cliente } from "@/types/Cliente";

const Cliente = () => {
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      codigo: "001",
      cnpj: "12.345.678/0001-90",
      razaoSocial: "Alpha Tecnologia Ltda.",
      nomeReduzido: "AlphaTec",
      inscricaoEstadual: "1234567890",
      inscricaoMunicipal: "9876543210",
      enderecoPrincipal: "Rua das Inovações, 100",
      bairro: "Centro",
      municipio: "São Paulo",
      uf: "SP",
      cep: "01000-000",
      telefone: "(11) 1234-5678",
      fax: "(11) 8765-4321",
      cxPostal: "12345",
      atividade: "Desenvolvimento de Software",
      naturezaOperacao: "Venda",
      condicaoPagamento: "30 dias",
      banco: "Banco do Brasil",
      agencia: "1234-5",
      conta: "67890-1",
      site: "https://www.alphatec.com.br",
      email: "contato@alphatec.com.br",
      followUp: "Mensal",
      enderecos: [
        { tipo: "Fiscal", logradouro: "Av. Paulista, 200", bairro: "Bela Vista", municipio: "São Paulo", uf: "SP", cep: "01310-000", telefone: "(11) 98765-4321" }
      ],
      contatos: [
        { 
          nome: "João Silva", 
          email: "joao@alphatec.com.br", 
          telefone1: "(11) 91234-5678", 
          cargo: "Gerente de Vendas", 
          poderDecisao: "Alto", 
          areaAtuacao: "Comercial", 
          telefone2: "(11) 98765-4321", 
          celular: "(11) 91234-5678",
          observacao: "Contato principal para negociações" 
        }
      ]
    },
    {
      codigo: "002",
      cnpj: "98.765.432/0001-10",
      razaoSocial: "Beta Indústria e Comércio S/A",
      nomeReduzido: "Beta",
      inscricaoEstadual: "1122334455",
      inscricaoMunicipal: "5544332211",
      enderecoPrincipal: "Av. das Indústrias, 5000",
      bairro: "Distrito Industrial",
      municipio: "Campinas",
      uf: "SP",
      cep: "13050-000",
      telefone: "(19) 3344-5566",
      fax: "(19) 6655-4433",
      cxPostal: "54321",
      atividade: "Fabricação de equipamentos",
      naturezaOperacao: "Industrialização",
      condicaoPagamento: "À vista",
      banco: "Itaú",
      agencia: "5678-9",
      conta: "12345-6",
      site: "https://www.betaind.com.br",
      email: "vendas@betaind.com.br",
      followUp: "Trimestral",
      enderecos: [],
      contatos: []
    },
    {
      codigo: "003",
      cnpj: "11.222.333/0001-44",
      razaoSocial: "Gamma Soluções Ambientais",
      nomeReduzido: "Gamma",
      inscricaoEstadual: "9988776655",
      inscricaoMunicipal: "5566778899",
      enderecoPrincipal: "Rua Verde, 321",
      bairro: "Jardim das Árvores",
      municipio: "Curitiba",
      uf: "PR",
      cep: "80000-000",
      telefone: "(41) 3322-4455",
      fax: "(41) 5544-3322",
      cxPostal: "67890",
      atividade: "Consultoria Ambiental",
      naturezaOperacao: "Prestação de Serviços",
      condicaoPagamento: "15 dias",
      banco: "Caixa Econômica",
      agencia: "3456",
      conta: "78901-2",
      site: "https://www.gammaeco.com.br",
      email: "gamma@gammaeco.com.br",
      followUp: "Semestral",
      enderecos: [
        { tipo: "Fiscal", logradouro: "Rua Verde, 321", bairro: "Jardim das Árvores", municipio: "Curitiba", uf: "PR", cep: "80000-000", telefone: "(41) 3322-4455" }
      ],
      contatos: []
    }]);

  const handleSave = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
    setOpen(false);
  };

  return (
    <PageContent
      title="Clientes"
      description="Gestão de clientes e prospects da empresa"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-muted-foreground" />
          <span className="text-muted-foreground">
            {clientes.length} cliente(s) cadastrado(s)
          </span>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-navy hover:bg-navy/90 text-white transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <ClienteTable clientes={clientes} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <ClienteForm onSave={handleSave} onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </PageContent>
  );
};

export default Cliente;
