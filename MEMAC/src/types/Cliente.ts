
export type Endereco = {
    tipo: "Fiscal" | "Entrega" | "Cobrança";
    logradouro: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    telefone: string;
  };
  
  export type Contato = {
    nome: string;
    cargo: string;
    poderDecisao: string;
    areaAtuacao: string;
    telefone1: string;
    telefone2: string;
    celular: string;
    email: string;
    observacao: string;
  };
  
  export type Cliente = {
    codigo: string;
    cnpj: string;
    razaoSocial: string;
    nomeReduzido: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    enderecoPrincipal: string; // Endereço principal como string
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    telefone: string;
    fax: string;
    cxPostal: string;
    atividade: string;
    naturezaOperacao: string;
    condicaoPagamento: string;
    banco: string;
    agencia: string;
    conta: string;
    site: string;
    email: string;
    followUp: string;
    enderecos: Endereco[]; // Array de endereços
    contatos: Contato[];   // Array de contatos
  };
  