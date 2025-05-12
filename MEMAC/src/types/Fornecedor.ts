
export interface FornecedorData {
    id: string;
    razaoSocial: string;
    cnpj: string;
    municipio?: string;
    uf?: string;
    nomeReduzido?: string;
    inscricaoEstadual?: string;
    inscricaoMunicipal?: string;
    endereco?: string;
    bairro?: string;
    cep?: string;
    telefone?: string;
    fax?: string;
    caixaPostal?: string;
    atividade?: string;
    naturezaOperacao?: string;
    comissao?: string;
    transportadora?: string;
    condPagto?: string;
    banco?: string;
    contaCorrente?: string;
    enderecoWeb?: string;
    email?: string;
    obs?: string;
  }
  
  export interface EnderecoData {
    codigo: string;
    tipo: string;
    endereco: string;
    bairro?: string;
    municipio?: string;
    uf?: string;
    cep?: string;
    cnpj?: string;
  }
  
  export interface ContatoData {
    codigo: string;
    nome: string;
    cargo?: string;
    poderDecisao?: string;
    areaAtuacao?: string;
    telefone1?: string;
    telefone2?: string;
    fax?: string;
    celular?: string;
    email?: string;
    obs?: string;
  }
  