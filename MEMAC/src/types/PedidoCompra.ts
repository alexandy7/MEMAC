export interface PedidoCompraData {
    id: string;
    status: string;
    ano: string;
    numero: string;
    revisao?: string;
    dataAbertura: string;
    fornecedor: string;
    atencaoDe?: string;
    telefone?: string;
    fax?: string;
    email?: string;
    naturezaOperacao?: string;
    icms?: string;
    condPagto?: string;
    comprador?: string;
    referencia?: string;
    refOF?: string;
    localEntrega?: string;
    transportadora?: string;
    telefoneTrans?: string;
    pedidoFornecimento?: string;
    ordemCompra?: string;
    situacao: "pendente" | "parcial" | "recebido" | "cancelado";
    observacoes?: string;
    itens: PedidoCompraItem[];
    valorISS?: number;
    valorIPI?: number;
    valorICMS?: number;
    valorTotal: number;
  }
  
  export interface PedidoCompraItem {
    id: string;
    codEngeman: string;
    unidade: string;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
    ipi?: number;
    iss?: number;
    valorTotal: number;
    dataEntrega?: string;
    atraso?: number;
  }
  